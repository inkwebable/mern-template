import { StrongPasswordRegex } from 'components/core/validation/regex';
import * as Yup from 'yup';

export const RegisterSchema = Yup.object().shape({
  name: Yup.string().min(2, 'Your name is too short').max(70, 'Your name is too Long (70 max chars)').required('Required'),
  email: Yup.string().email('Please use a valid email address').required('Required'),
  password: Yup.string()
    .required('Required')
    .matches(StrongPasswordRegex, 'Must be at least 6 characters, 1 lowercase, 1 uppercase, 1 number, 1 special character and at most 50'),
  confirmPassword: Yup.string()
    .required('Required')
    .oneOf([Yup.ref('password')], 'Passwords must match'),
});
