import { NextFunction, Request, Response } from 'express';
const AppError = require('./../utils/appError');
const User = require('./../models/user.model');
const catchAsync = require('./../utils/catchAsync');

exports.getAllUsers = catchAsync(
  async (_req: Request, res: Response, _next: NextFunction) => {
    const users = await User.find();

    res.status(200).json({
      status: 'success',
      results: users.length,
      data: {
        users,
      },
    });
  },
);

exports.getUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findById(req.params.id);

    if (!user) {
      return next(new AppError('No user found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
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
  };
}

exports.updateMe = catchAsync(
  async (req: RequestWithUser, res: Response, next: NextFunction) => {
    // Return an error if the user attempts to POST password data
    if (req.body.password) {
      return next(
        new AppError(
          'This route is not for password updates. Please use /update-password.',
          400,
        ),
      );
    }

    // Filter out fields that should not be updated
    const filteredBody = filterObj(req.body, 'name', 'email');

    // Update the user document in the database
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      filteredBody,
      {
        new: true,
        runValidators: true,
      },
    );

    res.status(200).json({
      status: 'success',
      data: {
        user: updatedUser,
      },
    });
  },
);

exports.deleteMe = catchAsync(
  catchAsync(
    async (req: RequestWithUser, res: Response, _next: NextFunction) => {
      await User.findByIdAndUpdate(req.user.id, { active: false });

      res.status(204).json({
        status: 'success',
        data: null,
      });
    },
  ),
);

// Filter out unwanted fields names that are not allowed to be updated
const filterObj = (obj: any, ...allowedFields: string[]) => {
  const newObj: any = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });

  return newObj;
};
