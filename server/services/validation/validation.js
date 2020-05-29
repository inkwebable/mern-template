import { Joi } from 'express-validation';
import { strongPasswordRegex } from './regex';
import { strongPasswordMessage } from './messages';

export const signUpValidation = {
  body: Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string()
      .pattern(strongPasswordRegex)
      .required()
      .messages({
        'string.pattern.base': strongPasswordMessage,
      }),
  }),
};

export const passwordValidation = {
  body: Joi.object().keys({
    password: Joi.string()
      .pattern(strongPasswordRegex)
      .required()
      .messages({
        'string.pattern.base': strongPasswordMessage,
      }),
  }),
};
