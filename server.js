import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import mongoSanitize from 'express-mongo-sanitize';

import { ValidationError } from 'express-validation';
import { loginController, logoutController, signupController, userController, usersController } from './controller';
import keys from './config/keys';
import { authenticate, authorise } from './middleware/auth';
import passwordController from './controller/password.controller';

const app = express();

console.log('express started - node env:', process.env.NODE_ENV);

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
app.use(mongoSanitize());

const apiRouter = express.Router();

app.use('/api', apiRouter);
apiRouter.use('/users', [authenticate], usersController);
apiRouter.use('/user', [authenticate, authorise(['admin', 'member'])], userController);
apiRouter.use('/login', loginController);
apiRouter.use('/logout', logoutController);
apiRouter.use('/signup', signupController);
apiRouter.use('/password', passwordController);

app.use((err, req, res, next) => {
  if (err instanceof ValidationError) {
    if (err && err.details) {
      const errs = err.details.map(errorObj => {
        const objKeys = Object.keys(errorObj);
        return { key: objKeys[0], message: errorObj[objKeys[0]] };
      });
      return res.status(err.statusCode).json({ errors: errs });
    }

    return res.status(err.statusCode).json(err);
  }

  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  return res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

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
    .connect(keys.mongoUrl, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log(`Connected to mongoDB`);
    })
    .catch(err => {
      console.log('mongo connection err', err);
    });
}

app.listen(keys.port, () => {
  console.log(`Server is running on port ${keys.port}!`);
});
