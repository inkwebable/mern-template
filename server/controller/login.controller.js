import express from 'express';
import { generateToken } from '../utils/generateToken';
import User from '../models/user/User';
import generateAuthCookies from '../utils/generateAuthCookies';

const loginController = express.Router();

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findByCredentials({ username, password });

    if (user) {
      if (!user.isVerified) {
        return res.status(403).send({ error: 'Your account has not been verified.' });
      }

      const token = generateToken(user.id, user.role);

      res = generateAuthCookies(token, res);

      return res.status(200).json({ role: user.role });
    }
    return res.send('Username or password incorrect');
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

loginController.post('', login);

export default loginController;
