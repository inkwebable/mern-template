import express from 'express';
import catchAsync from '../utils/CatchAsync';

const logoutController = express.Router();

const logout = catchAsync(async (req, res) => {
  try {
    res.cookie(
      'token',
      {},
      {
        expires: new Date(Date.now()),
        secure: false, // set to true if your using https
        httpOnly: true,
      },
    );

    return res.status(200).json({ message: 'User logged out' });
  } catch (err) {
    console.log('caught', err);
    return res.status(400).json(err.toString());
  }
});

logoutController.get('', logout);

logoutController.post('', logout);

export default logoutController;
