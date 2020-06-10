import crypto from 'crypto';
import express from 'express';
import { validate } from 'express-validation';

import User from '../models/user/User';
import VerificationToken from '../models/verificationToken/VerificationToken';
import Mailer from '../services/email/Mailer';
import confirmEmail from '../services/email/templates/confirm';
import SignUpService from '../services/signup/signup.service';
import { emailValidation, signUpValidation } from '../services/validation';
import AppError from '../utils/AppError';
import { catchAsync } from '../utils/errorHandling';
import generateAuthCookies from '../utils/generateAuthCookies';
import { generateToken } from '../utils/generateToken';

const signupController = express.Router();

const signup = catchAsync(async (req, res, next) => {
  const userReq = { role: 'member', ...req.body };

  const user = await SignUpService.registerUser(userReq);

  if (user && process.env.EMAIL_REGISTRATION !== 'true') {
    const token = generateToken(user.id, user.role);
    res = generateAuthCookies(token, res);
  }

  return res.status(201).json({ message: 'success', redirect: process.env.EMAIL_REGISTRATION === 'true' });
});

const confirm = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  VerificationToken.findOne({ token: id })
    .then((token) => {
      if (!token) {
        next(new AppError('Unable to find verification token', 404));
        // return res.status(404).send({ error: 'Unable to find verification token' });
      }

      User.findOne({ _id: token._userId })
        .then((user) => {
          if (!user) {
            next(new AppError('User not found, please sign up first', 428));
            // res.status(428).send({ error: 'User not found, please sign up first' });
          } else if (user && !user.isVerified) {
            User.findByIdAndUpdate(user._id, { isVerified: true })
              .then(() => res.status(200).json({ message: 'User confirmed' }))
              .catch((err) => console.log(err));
          } else {
            return res.status(208).json({ message: 'You have already signed up & your email is verified' });
          }
        })
        .catch((err) => console.log('find user error', err));
    })
    .catch((err) => {
      console.log('find verification token error', err);
    });
});

const resendConfirm = catchAsync(async (req, res, next) => {
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
    next(new AppError('Unable to send verification email', 422));
    // return res.status(422).send({ error: 'Unable to send verification email' });
  }
});

signupController.post('', validate(signUpValidation, { statusCode: 422, keyByField: true }, {}), signup);
signupController.post(
  '/confirm/resend',
  validate(emailValidation, { statusCode: 422, keyByField: true }),
  resendConfirm,
);
signupController.get('/confirm/:id', confirm);

export default signupController;
