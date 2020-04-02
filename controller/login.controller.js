import express from 'express';
import { generateToken, generateRefreshToken } from '../utils/generateToken';
import User from '../models/user';
import catchAsync from '../utils/CatchAsync';

const loginController = express.Router();

// @TODO  handle refresh
const refreshTokens = [];

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findByCredentials({ email, password });

    console.log(email, password, user);

    if (user) {
      const expiration = process.env.DB_ENV === 'testing' ? 100 : 604800000;

      const token = generateToken(user.id, user.role);

      // const refreshToken = generateRefreshToken(user.id, user.username, user.role);
      // refreshTokens.push(refreshToken);

      // could return the token if desired
      res.cookie('token', token, {
        expires: new Date(Date.now() + expiration),
        secure: false, // set to true if your using https
        httpOnly: true,
      });

      return res.status(200).json({ role: user.role });
    }
    return res.send('Username or password incorrect');
  } catch (err) {
    console.log('caught', err);
    return res.status(400).json(err.toString());
  }
});

loginController.post('', login);

export default loginController;
