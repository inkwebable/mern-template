import * as Yup from 'yup';

import { FormikFormField } from '../formik-form/formik-form';

export const loginSchema = Yup.object().shape({
  email: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
});

export const loginFields = [
  [
    {
      id: 'email',
      labelName: 'Username:',
      fieldType: 'email',
      placeholder: 'username',
      value: '',
      labelStyle: { width: '20%', flex: '0 0 none' },
      inputStyle: { width: '70%' },
    },
  ],
  [
    {
      id: 'password',
      labelName: 'Password:',
      fieldType: 'password',
      placeholder: 'password',
      value: '',
      labelStyle: { width: '20%', flex: '0 0 none' },
      inputStyle: { width: '70%', flex: '0 0 none' },
    },
  ],
] as FormikFormField[][];
