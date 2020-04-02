import express from 'express';
import { generateToken } from '../utils/generateToken';
import User from '../models/user';

const signupController = express.Router();

const signup = async (req, res) => {
  const userReq = { role: 'member', ...req.body };
  try {
    const user = new User(userReq);
    await user.save();
    const token = generateToken(user.id, user.role);
    const expiration = process.env.DB_ENV === 'testing' ? 100 : 604800000;
    res.cookie('token', token, {
      expires: new Date(Date.now() + expiration),
      secure: false, // set to true if your using https or prod @TODO
      httpOnly: true,
    });

    return res.status(201).json({ message: 'success' });
  } catch (err) {
    return res.status(500).json(err.toString());
  }
};

signupController.get('', (req, res) => {
  res.send('user sign up api');
});

signupController.post('', signup);

export default signupController;
