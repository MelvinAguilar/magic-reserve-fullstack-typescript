const Tour = require('../models/tour.model');
import { sendResponse } from './../utils/apiResponse';
import { NextFunction, Request, Response } from 'express';
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.getAllTours = catchAsync(
  async (_req: Request, res: Response, _next: NextFunction) => {
    const tours = new APIFeatures(Tour.find(), _req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const toursData = await tours.query;

    sendResponse(res, 200, toursData, toursData.length);
  },
);

exports.getTour = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const tour = await Tour.findById(req.params.id).populate('reviews');
    
    if (!tour) {
      return next(new AppError('No tour found with that ID', 404));
    }

    sendResponse(res, 200, tour);
  },
);

exports.createTour = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const newTour = await Tour.create(req.body);

    sendResponse(res, 201, newTour);
  },
);

exports.updateTour = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!tour) {
      return next(new AppError('No tour found with that ID', 404));
    }

    sendResponse(res, 200, tour);
  },
);

exports.deleteTour = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const deletedTour = await Tour.findByIdAndDelete(req.params.id);

    if (!deletedTour) {
      return next(new AppError('No tour found with that ID', 404));
    }

    sendResponse(res, 204, null);
  },
);

exports.aliasTopTours = (req: Request, _res: Response, next: Function) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};

exports.getTourStats = catchAsync(
  async (_req: Request, res: Response, _next: NextFunction) => {
    const stats = await Tour.aggregate([
      {
        // The $match stage filters the documents to only pass those with a ratingsAverage of 4.5
        // or higher to the next stage in the pipeline.
        $match: { ratingsAverage: { $gte: 4.5 } },
      },
      {
        // The $group stage groups the documents by the $difficulty field and calculates the
        // average price, the minimum price, the maximum price, the average rating, and the
        // total number of ratings for each group of documents.
        $group: {
          _id: '$difficulty',
          numTours: { $sum: 1 },
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' },
          avgRating: { $avg: '$ratingsAverage' },
          numRatings: { $sum: '$ratingsQuantity' },
        },
      },
      {
        // The $sort stage sorts the documents by the numTours field in descending order.
        $sort: { avgPrice: 1 },
      },
    ]);

    sendResponse(res, 200, stats);
  },
);

exports.getMonthlyPlan = catchAsync(
  async (_req: Request, res: Response, _next: NextFunction) => {
    const year = parseInt(_req.params.year);

    const plan = await Tour.aggregate([
      {
        // The $unwind stage deconstructs the startDates array field from each input document
        // to output a document for each element. Each output document replaces the array with
        // an element value.
        $unwind: '$startDates',
      },
      {
        // The $match stage filters the documents to only pass those with a startDates value
        // that falls within the specified date range to the next stage in the pipeline.
        $match: {
          startDates: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`),
          },
        },
      },
      {
        // The $group stage groups the documents by the month of the startDates field and
        // calculates the number of tours that started in each month and the names of the
        // tours that started in each month.
        $group: {
          _id: { $month: '$startDates' },
          numTourStarts: { $sum: 1 },
          tours: { $push: '$name' },
        },
      },
      {
        // The $addFields stage adds a month field to each document in the pipeline with the
        // specified value.
        $addFields: { month: '$_id' },
      },
      {
        // The $project stage reshapes each document in the pipeline by including, excluding,
        // or renaming fields.
        $project: { _id: 0 },
      },
      {
        // The $sort stage sorts the documents by the numTourStarts field in descending order.
        $sort: { numTourStarts: -1 },
      },
      {
        // The $limit stage limits the number of documents passed to the next stage in the
        $limit: 12,
      },
    ]);

    sendResponse(res, 200, plan);
  },
);
