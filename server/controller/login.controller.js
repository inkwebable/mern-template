import express from 'express';
import { generateToken, generateRefreshToken } from '../utils/generateToken';
import User from '../models/user/User';
import generateAuthCookies from '../utils/generateAuthCookies';
import { catchAsync } from '../utils/errorHandling';
import AppError from '../utils/AppError';

const loginController = express.Router();

// @TODO  handle refresh
// const refreshTokens = [];

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findByCredentials({ email, password });

  if (user) {
    if (!user.isVerified) {
      throw new AppError('Your account has not been verified.', 403);
      // return res.status(403).send({ error: 'Your account has not been verified.' });
    }

    const token = generateToken(user.id, user.role);

    res = generateAuthCookies(token, res);

    // const refreshToken = generateRefreshToken(user.id, user.username, user.role);
    // refreshTokens.push(refreshToken);

    // @TODO consider giving token to allow bearer token requests
    // return res.send(token);

    return res.status(200).json({ role: user.role });
  }

  return res.send('Username or password incorrect');
});

loginController.post('', login);

export default loginController;
