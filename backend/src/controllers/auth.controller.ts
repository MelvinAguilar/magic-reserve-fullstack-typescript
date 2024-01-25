import { NextFunction, Request, Response } from 'express';
const jwt = require('jsonwebtoken');
const User = require('./../models/user.model');
const catchAsync = require('./../utils/catchAsync');

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
  async (_req: Request, _res: Response, _next: NextFunction) => {
    //todo
  },
);
