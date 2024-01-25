import { NextFunction, Request, Response } from 'express';

const User = require('./../models/user.model');
const catchAsync = require('./../utils/catchAsync');

exports.signup = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const newUser = await User.create(req.body);

    res.status(201).json({
      status: 'success',
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
