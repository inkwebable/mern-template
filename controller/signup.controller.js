import express from 'express';
import { generateToken } from '../utils/generateToken';
import User from '../models/user';
import generateAuthCookies from '../utils/generateAuthCookies';

const signupController = express.Router();

const signup = async (req, res) => {
  const userReq = { role: 'member', ...req.body };
  try {
    const user = new User(userReq);
    await user.save();
    const token = generateToken(user.id, user.role);
    res = generateAuthCookies(token, res);

    return res.status(201).json({ message: 'success' });
  } catch (err) {
    console.log('signup controller caught', err);

    if (err && err.name === 'ValidationError') {
      const errs = Object.keys(err.errors).map(key => {
        if ({}.hasOwnProperty.call(err.errors, key)) {
          return { key, message: err.errors[key].message };
        }
      });

      return res.status(422).json({ errors: errs });
    }

    // A general error (db, crypto, etc…)
    return res.status(400).json({ error: 'Sorry we are unable to sign you up right now.' });
  }
};

signupController.get('', (req, res) => {
  res.send('user sign up api');
});

signupController.post('', signup);

export default signupController;
