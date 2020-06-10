import { Joi } from 'express-validation';

import { strongPasswordMessage } from './messages';
import { strongPasswordRegex } from './regex';

export const signUpValidation = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(strongPasswordRegex).required().messages({
      'string.pattern.base': strongPasswordMessage,
    }),
  }),
};

export const emailValidation = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
  }),
};

export const passwordValidation = {
  body: Joi.object().keys({
    password: Joi.string().pattern(strongPasswordRegex).required().messages({
      'string.pattern.base': strongPasswordMessage,
    }),
  }),
};
