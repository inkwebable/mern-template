import express from 'express';
import { validate } from 'express-validation';

import { generateToken } from '../utils/generateToken';
import generateAuthCookies from '../utils/generateAuthCookies';
import User from '../models/user/User';
import { signUpValidation } from '../services/validation';

const signupController = express.Router();

const signup = async (req, res) => {
  const userReq = { role: 'member', ...req.body };

  try {
    const existingUser = await User.exists({ username: userReq.username });

    if (existingUser) {
      return res.status(422).json({ errors: [{ key: 'username', message: 'Username already exists' }] });
    }

    const user = new User(userReq);
    user.isVerified = true;
    await user.save();
    const token = generateToken(user.id, user.role);
    res = generateAuthCookies(token, res);


    return res.status(201).json({ message: 'success', redirect: false });
  } catch (err) {
    if (err && err.name === 'ValidationError') {
      const errs = Object.keys(err.errors).map(key => {
        if ({}.hasOwnProperty.call(err.errors, key)) {
          return { key, message: err.errors[key].message };
        }
      });

      return res.status(422).json({ errors: errs });
    }

    return res.status(400).json({ error: 'Sorry we are unable to sign you up right now.' });
  }
};

signupController.post('', validate(signUpValidation, { statusCode: 422, keyByField: true }, {}), signup);

export default signupController;
