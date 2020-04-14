import express from 'express';
import { generateToken, generateRefreshToken } from '../utils/generateToken';
import User from '../models/user/User';
import catchAsync from '../utils/CatchAsync';
import generateAuthCookies from '../utils/generateAuthCookies';

const loginController = express.Router();

// @TODO  handle refresh
// const refreshTokens = [];

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findByCredentials({ email, password });

    if (user) {
      if (!user.isVerified) {
        return res.status(403).send({ error: 'Your account has not been verified.' });
      }

      const token = generateToken(user.id, user.role);

      res = generateAuthCookies(token, res);

      // const refreshToken = generateRefreshToken(user.id, user.username, user.role);
      // refreshTokens.push(refreshToken);

      // @TODO do not leave this uncommented in prod
      // return res.send(token);

      return res.status(200).json({ role: user.role });
    }
    return res.send('Username or password incorrect');
  } catch (err) {
    console.log('login controller caught', err);
    return res.status(400).json({ error: err.message });
  }
});

loginController.post('', login);

export default loginController;
