import { Joi } from 'express-validation';
import { strongPasswordRegex } from './regex';
import { strongPasswordMessage } from './messages';

export const signUpValidation = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .pattern(strongPasswordRegex)
      .required()
      .messages({
        'string.pattern.base': strongPasswordMessage,
      }),
  }),
};

export const emailValidation = {
  body: Joi.object().keys({
    email: Joi.string()
      .email()
      .required(),
  }),
};
