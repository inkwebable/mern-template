import express from 'express';
import crypto from 'crypto';
import { validate } from 'express-validation';

import User from '../models/user/User';
import Mailer from '../services/email/Mailer';
import { emailValidation, passwordValidation } from '../services/validation';
import ResetPasswordToken from '../models/resetPasswordToken/ResetPasswordToken';
import resetPassword from '../services/email/templates/resetPassword';

const passwordController = express.Router();

const updatePassword = async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;
  console.log('update password', req.params, req.body);

  ResetPasswordToken.findOne({ token: id })
    .then(token => {
      if (!token) {
        return res.status(404).send({ error: 'Your reset link has expired. Please request another.' });
      }

      User.findOne({ _id: token._userId })
        .then(user => {
          if (!user) {
            res.status(428).send({ error: 'User not found, please sign up first.' });
          } else if (user && !user.isVerified) {
            res.status(422).json({ error: 'You must verify your account first.' });
          } else {
            User.updateOne({ _id: user._id }, { $set: { password } })
              .then(() => {
                ResetPasswordToken.findOneAndDelete({ token: id }).catch(err => console.log(err));
                return res.status(200).json({ message: 'User password updated.' });
              })
              .catch(err => {
                console.log('update password error', err);
                return res.json({ error: 'Unable to complete password update.' });
              });
          }
        })
        .catch(err => console.log('find user error', err));
    })
    .catch(err => {
      console.log('find verification token error', err);
    });
};

const sendpasswordLink = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(428).send({ error: 'User not found, please sign up first.' });
  }

  if (!user.isVerified) {
    return res.status(428).json({ error: 'You must verify your account first.' });
  }

  try {
    const mailer = new Mailer({});
    const passwordResetToken = new ResetPasswordToken({
      _userId: user._id,
      token: crypto.randomBytes(16).toString('hex'),
    });
    await mailer.send(user.email, resetPassword(passwordResetToken.token));
    await passwordResetToken.save();
    return res.status(200).send({ message: 'Completed' });
  } catch (err) {
    console.log('err', err);
    return res.status(422).send({ error: 'Unable to send verification email.' });
  }
};

passwordController.put(
  '/reset/:id',
  validate(passwordValidation, { statusCode: 422, keyByField: true }),
  updatePassword,
);

passwordController.post(
  '/forgotten',
  validate(emailValidation, { statusCode: 422, keyByField: true }),
  sendpasswordLink,
);

export default passwordController;
