import express from 'express';
const morgan = require('morgan');
const indexRouter = require('./routes/index.router');
const globalErrorHandler = require('./controllers/error.controller');
const hpp = require('hpp');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');

const app = express();

// Set security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Rate limiter to control the number of requests from a single IP address
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/api', limiter);

// Body parser to read data from the request body into req.body (data size limited to 10kb)
app.use(express.json({ limit: '10kb' }));

// Data sanitization to protect against NoSQL query injection attacks
app.use(mongoSanitize());

// Data sanitization to protect against cross-site scripting (XSS) attacks
app.use(xss());

// HTTP parameter pollution (HPP) middleware to prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'price',
      'duration',
      'difficulty',
      'maxGroupSize',
      'ratingsAverage',
      'ratingsQuantity',
    ],
  }),
);

// Routes
app.use('/api/v1', indexRouter);

app.use(globalErrorHandler);

module.exports = app;
