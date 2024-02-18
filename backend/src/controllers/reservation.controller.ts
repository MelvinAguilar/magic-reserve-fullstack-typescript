const Reservation = require('../models/reservation.model');
const factory = require('./handler.factory');
import { Request, Response } from 'express';

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
