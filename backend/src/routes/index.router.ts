import { NextFunction, Request, Response } from 'express';

const express = require('express');
const router = express.Router();
const AppError = require('./../utils/appError');

// Require all route modules
const tourRouter = require('./tour.router');
const authRouter = require('./user.router');

// Use all route modules
router.use('/tours', tourRouter);
router.use('/users', authRouter);

// Handle all invalid routes
router.all('*', (req: Request, _res: Response, next: NextFunction) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

module.exports = router;
