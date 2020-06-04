import express from 'express';
import { catchAsync } from '../utils/errorHandling';

const logoutController = express.Router();

const logout = catchAsync(async (req, res) => {
  try {
    res.cookie(
      '_p',
      {},
      {
        maxAge: 0,
        httpOnly: false,
      },
    );

    res.cookie(
      '_s',
      {},
      {
        maxAge: 0,
        httpOnly: true,
      },
    );

    return res.status(200).json({ message: 'User logged out' });
  } catch (err) {
    console.log('logout err caught', err);
    return res.status(400).json(err.toString());
  }
});

logoutController.get('', logout);

logoutController.post('', logout);

export default logoutController;
