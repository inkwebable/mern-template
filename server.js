import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import { loginController, signupController, userController, usersController } from './controller';
import { authenticate } from './middleware/authenticate';
import { authorise } from './middleware/authorize';
// import AppError from './utils/AppError';
import logoutController from './controller/logout.controller';
import keys from './config/keys';

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

const apiRouter = express.Router();

app.use('/api', apiRouter);
apiRouter.use('/users', [authenticate], usersController);
apiRouter.use('/user', [authenticate, authorise(['admin', 'member'])], userController);
apiRouter.use('/login', loginController);
apiRouter.use('/logout', logoutController);
apiRouter.use('/signup', signupController);

if (process.env.NODE_ENV === 'production') {
  // express will server up prod assets
  // like main.js or main.css from the dir given below
  app.use(express.static('client/build'));

  // Express will serve index.html if it don't recognise the route
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

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

app.listen(keys.port, () => {
  console.log(`Server is running on port ${keys.port}!`);
});
