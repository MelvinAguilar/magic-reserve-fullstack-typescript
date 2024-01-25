import { NextFunction, Request, Response } from 'express';
const AppError = require('./../utils/appError');

// Handling invalid database IDs
const handleCastErrorDB = (err: any) => {
  const message = `Invalid ${err.path}: ${err.value}.`;

  return new AppError(message, 400);
};

// Handling non-existent/invalid database IDs
const handleIdErrorDB = (err: any) => {
  const message = `Invalid ID: ${err.value}.`;

  return new AppError(message, 404);
};

// Handling duplicate database fields
const handleDuplicateFieldsDB = (err: any) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];

  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, 400);
};

// Handling validation errors of database fields
const handleValidationErrorDB = (err: any) => {
  const errors = Object.values(err.errors).map((el: any) => el.message);

  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

// Sending error responses in development mode
const sendErrorDev = (err: any, res: Response) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

// Sending error responses in production mode
const sendErrorProd = (err: any, res: Response) => {
  /*
   * If the error is operational, witch means that it was created by the AppError
   * class, then send the error message to the client. Otherwise, send a generic
   * error message.
   */
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error('error: ', err);

    res.status(500).json({
      status: 'error',
      message: 'Something went wrong!',
    });
  }
};

module.exports = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    // Copying the error object
    let error = { ...err, message: err.message };

    if (error?.name === 'CastError') error = handleCastErrorDB(error); // invalid database IDs
    if (error?.kind === 'ObjectId') error = handleIdErrorDB(error); // non-existent/invalid database IDs
    if (error?.code === 11000) error = handleDuplicateFieldsDB(error); // duplicate database fields
    if (error?.name === 'ValidationError')
      // validation errors of database fields
      error = handleValidationErrorDB(error);

    sendErrorProd(error, res);
  }
};
