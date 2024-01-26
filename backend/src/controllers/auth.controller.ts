const crypto = require('crypto');
const { promisify } = require('util');
import { NextFunction, Request, Response } from 'express';
const jwt = require('jsonwebtoken');
const User = require('./../models/user.model');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
import { sendResponse } from './../utils/apiResponse';
const { sendEmail } = require('./../utils/sendEmail');

const signToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user: any, statusCode: number, res: Response) => {
  const token = signToken(user._id);

  // Send the response to the client
  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

exports.signup = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    createSendToken(newUser, 201, res);
  },
);

exports.login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    // Validate that both email and password are provided in the request body.
    if (!email || !password) {
      return next(new AppError('Email and password are required!', 400));
    }

    // Verify if a user exists with the provided email and if the provided password is correct.
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new AppError('Invalid email or password', 401));
    }

    // If the email and password are valid, generate and send a token to the client.
    createSendToken(user, 200, res);
  },
);

interface RequestWithUser extends Request {
  user: {
    id: string;
    name: string;
    email: string;
    photo: string;
    role: string;
  };
}

exports.authenticate = catchAsync(
  async (req: RequestWithUser, _res: Response, next: NextFunction) => {
    //  Retrieve the token and verify its presence
    let authToken;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      authToken = req.headers.authorization.split(' ')[1];
    }

    // If the token is not present, return an error
    if (!authToken) {
      return next(
        new AppError(
          'You are not authenticated! Please log in to gain access.',
          401,
        ),
      );
    }

    // Validate the token
    const decodedToken = await promisify(jwt.verify)(
      authToken,
      process.env.JWT_SECRET as string,
    );

    //  Verify if the user associated with the token still exists in the database
    const existingUser = await User.findById(decodedToken.id);
    if (!existingUser) {
      return next(
        new AppError(
          'The user associated with the provided token no longer exists.',
          401,
        ),
      );
    }

    // Verify if the user has changed their password after the token was issued
    if (existingUser.changedPasswordAfter(decodedToken.iat)) {
      return next(
        new AppError(
          'The password has been changed since the token was issued. Please log in again.',
          401,
        ),
      );
    }

    // If all the checks pass, grant access to the protected route
    req.user = existingUser;
    next();
  },
);

exports.authorization = (...roles: string[]) => {
  return (req: RequestWithUser, _res: Response, next: NextFunction) => {
    // If the user is not authenticated, they will not be able to access the protected route
    if (!req.user) {
      return next(
        new AppError(
          'You are not authenticated! Please log in to gain access.',
          401,
        ),
      );
    }

    // If the user is authenticated, check if they have the required role to access the protected route
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action.', 403),
      );
    }

    next();
  };
};

exports.forgotPassword = catchAsync(
  async (req: RequestWithUser, res: Response, next: NextFunction) => {
    // Verify if a user exists with the provided email
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return next(
        new AppError(
          'The user associated with the provided email address does not exist.',
          404,
        ),
      );
    }

    // Generate a random token
    const resetToken = user.createPasswordResetToken();
    // Disable all the validators before saving the user to the database
    await user.save({ validateBeforeSave: false });

    // Create the reset URL to be sent to the user via email
    const resetURL = `${req.protocol}://${req.get(
      'host',
    )}/api/v1/users/reset-password/${resetToken}`;

    try {
      // Define the email content
      const emailContent = {
        recipientEmail: user.email,
        subject: 'Password Reset (Valid for 20 Minutes)',
        message: `To reset your password, please click on the following link: ${resetURL}`,
      };

      // Send the email
      await sendEmail(emailContent);

      sendResponse(res, 200, {
        status: 'success',
        message: 'Token sent to email!',
      });
    } catch (err) {
      // If an error occurs, clear the password reset token and the password reset token expiration date
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save({ validateBeforeSave: false });

      return next(
        new AppError(
          'An error occurred while sending the password reset email. Please try again later!',
          500,
        ),
      );
    }
  },
);

exports.resetPassword = catchAsync(
  async (req: RequestWithUser, res: Response, next: NextFunction) => {
    // Verify if a user exists with the provided token
    const hashedToken = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex');

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) {
      return next(
        new AppError(
          'The user associated with the provided token does not exist.',
          404,
        ),
      );
    }

    // Update the user's password
    user.password = req.body.password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save();

    createSendToken(user, 200, res);
  },
);

exports.updatePassword = catchAsync(
  async (req: RequestWithUser, res: Response, next: NextFunction) => {
    // Verify if a user exists with the provided email and if the provided password is correct.
    const user = await User.findById(req.user.id).select('+password');

    // Check if the provided current password is correct
    if (
      !user ||
      !(await user.correctPassword(req.body.passwordCurrent, user.password))
    ) {
      return next(new AppError('Invalid email or password', 401));
    }

    // Update the user's password
    user.password = req.body.password;

    await user.save();

    createSendToken(user, 200, res);
  },
);
