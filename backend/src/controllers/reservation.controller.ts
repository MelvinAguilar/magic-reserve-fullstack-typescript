const Reservation = require('../models/reservation.model');
const factory = require('./handler.factory');
import { Request, Response } from 'express';
const catchAsync = require('./../utils/catchAsync');

exports.getAllReservations = factory.getAll(Reservation);
exports.getReservation = factory.getOne(Reservation);
exports.createReservation = factory.createOne(Reservation);
exports.updateReservation = factory.updateOne(Reservation);
exports.deleteReservation = factory.deleteOne(Reservation);
exports.getMyReservations = factory.getMyRecords(Reservation);

exports.setReservationUserIds = (
  req: Request & { user: { id: string } },
  _res: Response,
  next: Function,
) => {
  // Allow nested routes
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;

  next();
};

exports.onlyMyReservations = catchAsync( async (
  req: Request & { user: { id: string } },
  _res: Response,
  next: Function,
) => {
  const idReservation = req.params.id;
  const idUser = req.user.id;

  if (!idReservation || !idUser) {
    return next(
      new AppError('You must be logged in to access this route', 401),
    );
  }

  // Check if the reservation belongs to the user
  const reservation = await Reservation.findById(idReservation);
  if (!reservation) {
    return next(new AppError('No reservation found with that ID', 404));
  }

  if (!reservation.user.equals(idUser)) {
    return next(
      new AppError('You are not allowed to access this reservation', 401),
    );
  }

  next();
});
