const Tour = require('../models/tour.model');
import { sendResponse } from './../utils/apiResponse';
import { NextFunction, Request, Response } from 'express';
const catchAsync = require('./../utils/catchAsync');
const factory = require('./handler.factory');

exports.getAllTours = factory.getAll(Tour);
exports.getTour = factory.getOne(Tour, { path: 'reviews' });
exports.createTour = factory.createOne(Tour);
exports.updateTour = factory.updateOne(Tour);
exports.deleteTour = factory.deleteOne(Tour);

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

exports.getToursWithin = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    // The distance and unit parameters are specified in the format distance/unit.
    const { distance, latlng, unit } = req.params;
    const [lat, lng] = latlng.split(',');

    // The radius of the earth is 3963.2 miles or 6378.1 kilometers.
    const radius = unit === 'mi' ? parseFloat(distance) / 3963.2 : parseFloat(distance) / 6378.1;

    // If no latitude or longitude is provided, the API will return an error.
    if (!lat || !lng) {
      throw new Error(
        'Please provide latitude and longitude in the format lat,lng.',
      );
    }

    // The $geoWithin operator selects documents with geospatial data that exists entirely
    // within a specified shape. The query returns documents that are within the specified
    // circle, where the center is defined by the point and the distance by the radius.
    const tours = await Tour.find({
      startLocation: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
    });

    sendResponse(res, 200, tours, tours.length);
  },
);

exports.getDistances = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    // latitudes and longitudes are specified in the format lat,lng.
    const { latlng, unit } = req.params;
    const [lat, lng] = latlng.split(',');

    // If no latitude or longitude is provided, the API will return an error.
    if (!lat || !lng) {
      throw new Error(
        'Please provide latitude and longitude in the format lat,lng.',
      );
    }

    // The distanceMultiplier field specifies the factor to multiply all distances
    const multiplier = unit === 'mi' ? 0.000621371 : 0.001;

    // The $geoNear stage outputs documents in order of nearest to farthest from a specified
    // point. To use $geoNear, it must be the first stage in the pipeline.
    const distances = await Tour.aggregate([
      {
        $geoNear: {
          // The near field specifies the point for which to find the closest documents.
          near: {
            type: 'Point',
            coordinates: [parseFloat(lng), parseFloat(lat)],
          },
          // The distanceField field specifies the output field that contains the calculated
          // distance. The distance is returned in meters by default.
          distanceField: 'distance',
          // The distanceMultiplier field specifies the factor to multiply all distances
          // returned by the query.
          distanceMultiplier: multiplier,
        },
      },
      {
        // The $project stage reshapes each document in the pipeline by including, excluding,
        // or renaming fields.
        $project: {
          distance: 1,
          name: 1,
        },
      },
    ]);

    sendResponse(res, 200, distances);
  },
);