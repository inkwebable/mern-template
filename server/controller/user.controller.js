import express from 'express';

const userController = express.Router();

userController.get('/', (req, res) => {
  res.status(200).json({
    status: 'user Controller API call successful',
  });
});

// @TODO send to react FE
userController.get('/me', (req, res) => {
  res.status(200).json({
    status: 'your profile',
  });
});

export default userController;
