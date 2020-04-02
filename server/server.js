import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import { loginController, signupController, userController, usersController } from './controller';
import { authenticate } from './middleware/authenticate';
import { authorise } from './middleware/authorize';
import AppError from './utils/AppError';
import logoutController from './controller/logout.controller';
import keys from './config/keys';

dotenv.config();

const app = express();

console.log('express started', process.env.NODE_ENV);

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: [`${keys.clientUrl}`, 'http://localhost:3000'],
    credentials: true,
  }),
);
app.use(cookieParser());

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

// app.use(function handleDatabaseError(error, request, response, next) {
//   if (error instanceof MongoError) {
//     if (error.code === 11000) {
//       return response
//         .status(HttpStatus.CONFLICT)
//         .json({
//           httpStatus: HttpStatus.CONFLICT,
//           type: 'MongoError',
//           message: error.message
//         });
//     } else {
//       return response.status(503).json({
//         httpStatus: HttpStatus.SERVICE_UNAVAILABLE,
//         type: 'MongoError',
//         message: error.message
//       });
//     }
//   }
//   next(error);
// });

// use all controllers(APIs) here
const apiRouter = express.Router();
app.use('/api', apiRouter);
apiRouter.use('/users', [authenticate], usersController);
apiRouter.use('/user', [authenticate, authorise(['admin', 'member'])], userController);
apiRouter.use('/login', loginController);
apiRouter.use('/logout', logoutController);
apiRouter.use('/signup', signupController);

app.all('*', (req, res, next) => {
  // res.status(404).json({
  //   status: 'fail',
  //   message: `Can't find ${req.originalUrl} on this server!`
  // });

  // const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  //   // err.status = 'fail';
  //   // err.statusCode = 404;
  //   //
  //   // next(err);

  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

console.log(keys.mongoUrl);

// Start Server here
app.listen(keys.port, () => {
  if (keys.mongoUrl) {
    mongoose
      .connect(keys.mongoUrl, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false })
      .then(() => {
        console.log(`Connected to mongoDB`);
      })
      .catch(err => {
        console.log(err);
      });
  }
  console.log(`Server is running on port ${keys.port}!`);
});
