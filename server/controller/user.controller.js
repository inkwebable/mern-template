import express from 'express';
import { authenticate } from '../middleware/authenticate';

const userController = express.Router();

userController.get('/', (req, res) => {
  res.status(200).json({
    status: 'user Controller API call successful',
  });
});

userController.get('/me', (req, res) => {
  res.status(200).json({
    status: 'your profile',
  });
});

export default userController;
