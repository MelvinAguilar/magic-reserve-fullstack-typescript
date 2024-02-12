import { NextFunction, Request, Response } from 'express';
const AppError = require('./../utils/appError');
const User = require('./../models/user.model');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./handler.factory');

exports.getAllUsers = factory.getAll(User);
exports.getUser = factory.getOne(User);
exports.createUser = factory.createOne(User);
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);

interface RequestWithUser extends Request {
  user: {
    id: string;
    name: string;
    email: string;
    photo: string;
    role: string;
  };
}

exports.getMe = (req: RequestWithUser, _res: Response, next: NextFunction) => {
  req.params.id = req.user.id;

  next();
};

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
    const filteredBody = filterObj(req.body, 'name', 'email', 'photo');

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
