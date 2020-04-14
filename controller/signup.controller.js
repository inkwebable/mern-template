import express from 'express';
import crypto from 'crypto';
import { validate } from 'express-validation';

import { generateToken } from '../utils/generateToken';
import generateAuthCookies from '../utils/generateAuthCookies';
import Mailer from '../services/email/Mailer';
import confirmEmail from '../services/email/templates/confirm';
import keys from '../config/keys';
import User from '../models/user/User';
import VerificationToken from '../models/verificationToken/VerificationToken';
import { emailValidation, signUpValidation } from '../services/validation';

const signupController = express.Router();

const signup = async (req, res) => {
  const userReq = { role: 'member', ...req.body };
  try {
    const user = new User(userReq);
    if (keys.emailRegistration) {
      // @TODO use mongodb transactions to prevent storing user if error here
      const mailer = new Mailer({});
      await user.save();
      const verificationToken = new VerificationToken({
        _userId: user._id,
        token: crypto.randomBytes(16).toString('hex'),
      });
      await verificationToken.save();
      await mailer.send(user.email, confirmEmail(user.name, verificationToken.token));
    } else {
      user.isVerified = true;
      await user.save();
      const token = generateToken(user.id, user.role);
      res = generateAuthCookies(token, res);
    }

    return res.status(201).json({ message: 'success', redirect: keys.emailRegistration });
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
          // confirmation email.
          if (!user) {
            res.send({ error: 'User not found' });
          }

          // The user exists but has not been confirmed. We need to confirm this
          // user and let them know their email address has been confirmed.
          else if (user && !user.isVerified) {
            User.findByIdAndUpdate(user._id, { isVerified: true })
              .then(() => res.json({ message: 'User confirmed' }))
              .catch(err => console.log(err));
          }

          // The user has already confirmed this email address.
          else {
            res.status(208).json({ message: 'You have already registered & your email is verified' });
          }
        })
        .catch(err => console.log('find user error', err));
    })
    .catch(err => {
      console.log('error');
    });
};

const resendConfirm = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(200).send({ message: 'Completed' });
  }

  if (user.isVerified) {
    res.status(208).json({ message: 'You have already registered & your email is verified' });
  }

  try {
    const mailer = new Mailer({});
    const verificationToken = new VerificationToken({
      _userId: user._id,
      token: crypto.randomBytes(16).toString('hex'),
    });
    await verificationToken.save();
    await mailer.send(user.email, confirmEmail(user.name, verificationToken.token));
    return res.status(200).send({ message: 'Completed' });
  } catch (err) {
    console.log('err', err);
    return res.status(422).send({ error: 'Unable to send verification email' });
  }
};

signupController.post('', validate(signUpValidation, { statusCode: 422, keyByField: true }, {}), signup);
signupController.get('/confirm/:id', confirm);
signupController.post('/resend', validate(emailValidation, { statusCode: 422, keyByField: true }), resendConfirm);

export default signupController;
