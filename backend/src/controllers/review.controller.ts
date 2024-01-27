const Review = require('./../models/review.model');
import { sendResponse } from './../utils/apiResponse';
import { NextFunction, Request, Response } from 'express';
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.getAllReviews = catchAsync(
  async (_req: Request, res: Response, _next: NextFunction) => {
    const reviews = new APIFeatures(Review.find(), _req.query)
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
  async (req: Request, res: Response, _next: NextFunction) => {
    const newReview = await Review.create(req.body);

    sendResponse(res, 201, newReview);
  },
);

