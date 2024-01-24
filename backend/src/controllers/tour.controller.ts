const Tour = require('../models/tour.model');
import { sendResponse, sendError } from '../utils/apiResponse';
import { Request, Response } from 'express';

exports.getAllTours = async (_req: Request, res: Response) => {
  try {
    const tours = await Tour.find();

    sendResponse(res, 200, tours, tours.length);
  } catch (err) {
    sendError(res, 404, err);
  }
};

exports.getTour = async (req: Request, res: Response) => {
  try {
    const tour = await Tour.findById(req.params.id);

    sendResponse(res, 200, tour);
  } catch (err) {
    sendError(res, 404, err);
  }
};

exports.createTour = async (req: Request, res: Response) => {
  try {
    const newTour = await Tour.create(req.body);

    sendResponse(res, 201, newTour);
  } catch (err) {
    sendError(res, 400, err);
  }
};

exports.updateTour = async (req: Request, res: Response) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    sendResponse(res, 200, tour);
  } catch (err) {
    sendError(res, 404, err);
  }
};

exports.deleteTour = async (req: Request, res: Response) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);

    sendResponse(res, 204, null);
  } catch (err) {
    sendError(res, 404, err);
  }
};