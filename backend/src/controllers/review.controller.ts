const Review = require('./../models/review.model');
import { Request, Response } from 'express';
const factory = require('./handler.factory');

exports.getAllReviews = factory.getAll(Review);
exports.getReview = factory.getOne(Review);
exports.createReview = factory.createOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);

exports.setTourUserIds = (
  req: Request & { user: { id: string } },
  _res: Response,
  next: Function,
) => {
  // Allow nested routes
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;

  next();
};