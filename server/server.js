import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import mongoSanitize from 'express-mongo-sanitize';

import { ValidationError } from 'express-validation';
import apiRouter from './routes';
import {
  handleCastErrorDB,
  handleDuplicateFieldsDB,
  handleExpressValidationError,
  handleValidationErrorDB,
  sendErrorDev,
  sendErrorProd,
} from './utils/errorHandling';

const app = express();

console.log('express started - node env:', process.env.NODE_ENV);

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: [`${process.env.CLIENT_URL}`, 'http://localhost:3000'],
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(mongoSanitize());

app.use('/api', apiRouter);

app.use((err, req, res, next) => {
  console.log('main error handler', err);
  let error = { ...err };
  if (err instanceof ValidationError) error = handleExpressValidationError(error);
  if (error.name === 'CastError') error = handleCastErrorDB(error);
  if (error.code === 11000) error = handleDuplicateFieldsDB(error);
  if (error.name === 'ValidationError') error = handleValidationErrorDB(error);
  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(error, res);
  } else if (process.env.NODE_ENV === 'production') {
    sendErrorProd(error, res);
  } else {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }
});

if (process.env.NODE_ENV === 'production') {
  // express will server up prod assets
  // like main.js or main.css from the dir given below
  app.use(express.static('../client/build'));

  // Express will serve index.html if it don't recognise the route
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
  });
}

if (process.env.NODE_ENV !== 'test') {
  // mongoose options
  const options = {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
    autoIndex: false,
    poolSize: 10,
    bufferMaxEntries: 0,
  };

  const dbConnectionURL = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOSTNAME}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`;

  mongoose
    .connect(process.env.DB_ENV === 'local' ? dbConnectionURL : process.env.MONGO_URL, options)
    .then(() => {
      console.log(`Connected to mongoDB `, process.env.DB_ENV);
    })
    .catch(err => {
      console.log('dbConnectionURL ', dbConnectionURL);
      console.log('mongo connection err', err);
    });
}

const server = app.listen(process.env.NODE_ENV === 'test' ? 5222 : process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.NODE_ENV === 'test' ? 5222 : process.env.PORT}!`);
});

export default server;
