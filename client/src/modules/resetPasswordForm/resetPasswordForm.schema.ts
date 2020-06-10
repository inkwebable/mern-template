import * as Yup from 'yup';

import { StrongPasswordRegex } from '../core/validation';

export const ResetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .required('Required')
    .matches(StrongPasswordRegex, 'Must be at least 6 characters, 1 lowercase, 1 uppercase, 1 number, 1 special character and at most 50'),
  confirmPassword: Yup.string()
    .required('Required')
    .oneOf([Yup.ref('password')], 'Passwords must match'),
});
