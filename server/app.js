// Import all dependencies & middleware here
import express from 'express';
import { userController, loginController } from './controller';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { authenticate } from './middleware/authenticate';
import { authorise } from './middleware/authorize';
import helmet from 'helmet';

dotenv.config();

const app = express();

app.use(helmet());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  cors({
    origin: [`${process.env.FRONT_URL}`, 'http://localhost:3000'],
    credentials: true,
}));
app.use(cookieParser());

// use all controllers(APIs) here
const apiRouter = express.Router();
app.use('/api', apiRouter);
apiRouter.use('/users', [authenticate, authorise(["admin", "member"])], userController);
apiRouter.use('/login', loginController);

console.log(process.env.MONGODB_URL);

// Start Server here
app.listen(process.env.PORT, () => {
    if(!!process.env.MONGODB_URL) {
      mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true, useCreateIndex: true}).then(() => {
        console.log(`Conneted to mongoDB at port 27017`);
      }).catch(err => {
        console.log(err);
      });
    }
  console.log(`Server is running on port ${process.env.PORT}!`);
});
