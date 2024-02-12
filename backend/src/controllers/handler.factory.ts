import { NextFunction, Request, Response } from 'express';

const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const APIFeatures = require('./../utils/apiFeatures');

import { sendResponse } from './../utils/apiResponse';

/*
 * @param {Model} Model - The model to query
 * @returns {Function} - A middleware function
 */
exports.deleteOne = (Model: any) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(
        new AppError(`No ${Model.modelName} found with that ID`, 404),
      );
    }

    sendResponse(res, 200, []);
  });

/*
 * @param {Model} Model - The model to query
 * @returns {Function} - A middleware function
 */
exports.updateOne = (Model: any) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(
        new AppError(`No ${Model.modelName} found with that ID`, 404),
      );
    }

    sendResponse(res, 200, doc);
  });

/*
 * @param {Model} Model - The model to query
 * @returns {Function} - A middleware function
 */
exports.createOne = (Model: any) =>
  catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
    const doc = await Model.create(req.body);

    sendResponse(res, 201, doc);
  });

/*
 * @param {Model} Model - The model to query
 * @returns {Function} - A middleware function
 */
exports.getOne = (Model: any, popOptions: any) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);

    const doc = await query;

    if (!doc) {
      return next(
        new AppError(`No ${Model.modelName} found with that ID`, 404),
      );
    }

    sendResponse(res, 200, doc);
  });

/*
 * @param {Model} Model - The model to query
 * @returns {Function} - A middleware function
 */
exports.getAll = (Model: any) =>
  catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
    // To allow for nested GET reviews on tour
    let filter = {};
    if (req.params.tourId) filter = { tour: req.params.tourId };

    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const docs = await features.query;

    sendResponse(res, 200, docs, docs.length);
  });
