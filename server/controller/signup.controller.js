import express from 'express';
import crypto from 'crypto';
import { validate } from 'express-validation';

import { generateToken } from '../utils/generateToken';
import generateAuthCookies from '../utils/generateAuthCookies';
import Mailer from '../services/email/Mailer';
import confirmEmail from '../services/email/templates/confirm';
import User from '../models/user/User';
import VerificationToken from '../models/verificationToken/VerificationToken';
import { emailValidation, signUpValidation } from '../services/validation';

const signupController = express.Router();

const signup = async (req, res) => {
  const userReq = { role: 'member', ...req.body };

  try {
    const existingUser = await User.exists({ email: userReq.email });

    if (existingUser) {
      return res.status(422).json({ errors: [{ key: 'email', message: 'Email already exists' }] });
    }

    if (process.env.EMAIL_REGISTRATION) {
      const user = new User(userReq);
      const mailer = new Mailer({});
      const verificationToken = new VerificationToken({
        _userId: user._id,
        token: crypto.randomBytes(16).toString('hex'),
      });
      await mailer.send(user.email, confirmEmail(user.name, verificationToken.token));
      await verificationToken.save();
      await user.save();
    } else {
      const user = new User(userReq);
      user.isVerified = true;
      await user.save();
      const token = generateToken(user.id, user.role);
      res = generateAuthCookies(token, res);
    }

    return res.status(201).json({ message: 'success', redirect: process.env.EMAIL_REGISTRATION });
  } catch (err) {
    console.log('signup control caught', err);

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

const confirm = async (req, res) => {
  const { id } = req.params;

  VerificationToken.findOne({ token: id })
    .then(token => {
      if (!token) {
        return res.status(404).send({ error: 'Unable to find verification token' });
      }

      User.findOne({ _id: token._userId })
        .then(user => {
          if (!user) {
            res.status(428).send({ error: 'User not found, please sign up first' });
          } else if (user && !user.isVerified) {
            User.findByIdAndUpdate(user._id, { isVerified: true })
              .then(() => res.status(200).json({ message: 'User confirmed' }))
              .catch(err => console.log(err));
          } else {
            return res.status(208).json({ message: 'You have already signed up & your email is verified' });
          }
        })
        .catch(err => console.log('find user error', err));
    })
    .catch(err => {
      console.log('find verification token error', err);
    });
};

const resendConfirm = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(200).send({ message: 'Completed' });
  }

  if (user.isVerified) {
    return res.status(208).send({ message: 'You have already signed up & your email is verified' });
  }

  try {
    const mailer = new Mailer({});
    const verificationToken = new VerificationToken({
      _userId: user._id,
      token: crypto.randomBytes(16).toString('hex'),
    });
    await mailer.send(user.email, confirmEmail(user.name, verificationToken.token));
    await verificationToken.save();
    return res.status(200).send({ message: 'Completed' });
  } catch (err) {
    console.log('err', err);
    return res.status(422).send({ error: 'Unable to send verification email' });
  }
};

signupController.post('', validate(signUpValidation, { statusCode: 422, keyByField: true }, {}), signup);
signupController.post(
  '/confirm/resend',
  validate(emailValidation, { statusCode: 422, keyByField: true }),
  resendConfirm,
);
signupController.get('/confirm/:id', confirm);

export default signupController;
