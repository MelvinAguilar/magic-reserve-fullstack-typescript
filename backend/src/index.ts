import express from 'express';
const morgan = require('morgan');
const indexRouter = require('./routes/index.router');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.use('/api/v1', indexRouter);

module.exports = app;
