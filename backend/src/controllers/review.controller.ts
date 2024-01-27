const Review = require('./../models/review.model');
import { sendResponse } from './../utils/apiResponse';
import { NextFunction, Request, Response } from 'express';
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.getAllReviews = catchAsync(
  async (_req: Request, res: Response, _next: NextFunction) => {
    let filter = {};
    if (_req.params.tourId) filter = { tour: _req.params.tourId };

    const reviews = new APIFeatures(Review.find(filter), _req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const reviewsData = await reviews.query;

    sendResponse(res, 200, reviewsData, reviewsData.length);
  },
);

exports.getReview = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return next(new AppError('No review found with that ID', 404));
    }

    sendResponse(res, 200, review);
  },
);

exports.createReview = catchAsync(
  async (
    req: Request & { user: { id: string } },
    res: Response,
    _next: NextFunction,
  ) => {
    if (!req.body.tour) req.body.tour = req.params.tourId;
    if (!req.body.user) req.body.user = req.user.id;

    const newReview = await Review.create(req.body);

    sendResponse(res, 201, newReview);
  },
);
