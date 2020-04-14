import * as Yup from 'yup';

export const VerifyEmailFormSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please use a valid email address')
    .required('Required'),
});
