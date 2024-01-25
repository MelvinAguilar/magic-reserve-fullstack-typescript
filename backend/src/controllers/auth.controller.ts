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
    const token =  signToken(user._id);

    res.status(201).json({
      status: 'success',
      token,
    });
  },
);
