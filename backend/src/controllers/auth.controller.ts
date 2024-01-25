const { promisify } = require('util');
import { NextFunction, Request, Response } from 'express';
const jwt = require('jsonwebtoken');
const User = require('./../models/user.model');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

const signToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });

    const token = signToken(newUser._id);

    res.status(201).json({
      status: 'success',
      token,
      data: {
        newUser,
      },
    });
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
    // createSendToken(user, 200, res);
    const token = signToken(user._id);

    res.status(201).json({
      status: 'success',
      token,
    });
  },
);

interface RequestWithUser extends Request {
  user: {
    id: string;
    name: string;
    email: string;
    photo: string;
    role: string;
  }
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
        new AppError(
          'You do not have permission to perform this action.',
          403,
        ),
      );
    }

    next();
  };
}