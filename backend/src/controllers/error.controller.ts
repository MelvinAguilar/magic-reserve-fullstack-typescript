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
  const value = err.message.match(/(["'])(\\?.)*?\1/)[0];

  let message = `Duplicate field value: ${value}. Please use another value!`;

  if (err.message.includes('.reviews index')) {
    message = `Duplicate review for this user and tour! You can only review a tour once.`;
  }

  return new AppError(message, 400);
};

// Handling validation errors of database fields
const handleValidationErrorDB = (err: any) => {
  const errors = Object.values(err.errors).map((el: any) => el.message);

  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

// Handling invalid JWT token
const handleJWTError = () =>
  new AppError('Invalid token. Please log in again!', 401);

// Handling expired JWT token
const handleJWTExpiredError = () =>
  new AppError('Your token has expired! Please log in again.', 401);

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
    if (error.name === 'JsonWebTokenError') error = handleJWTError(); // invalid JWT token
    if (error.name === 'TokenExpiredError') error = handleJWTExpiredError(); // expired JWT token

    sendErrorProd(error, res);
  }
};
