import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import { authenticate } from './middleware/authenticate';
import { userController, loginController, signupController } from './controller';

dotenv.config();

const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: [`${process.env.FRONT_URL}`, 'http://localhost:3000'],
    credentials: true,
  }),
);
app.use(cookieParser());

// use all controllers(APIs) here
const apiRouter = express.Router();
app.use('/api', apiRouter);
// apiRouter.use('/users', [authenticate, authorise(['admin', 'member'])], userController);
apiRouter.use('/users', [authenticate], userController);
apiRouter.use('/login', loginController);
apiRouter.use('/signup', signupController);

console.log(process.env.MONGODB_URL);

// Start Server here
app.listen(process.env.PORT, () => {
  if (process.env.MONGODB_URL) {
    mongoose
      .connect(process.env.MONGODB_URL, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false })
      .then(() => {
        console.log(`Conneted to mongoDB`);
      })
      .catch(err => {
        console.log(err);
      });
  }
  console.log(`Server is running on port ${process.env.PORT}!`);
});
