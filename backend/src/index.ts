import express from 'express';
const morgan = require('morgan');
const indexRouter = require('./routes/index.router');
const globalErrorHandler = require('./controllers/error.controller');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.use('/api/v1', indexRouter);

app.use(globalErrorHandler);

module.exports = app;
