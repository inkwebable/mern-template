import axios from 'axios';
import { ErrorMessage, Field, Form, Formik, FormikErrors } from 'formik';
import React, { FunctionComponent, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';

import { SessionContext } from '../auth/session';
import { StyledFloatButton } from '../core/buttons';
import { FormContainer, FormGroup } from '../core/form';
import { StrongPasswordRegex } from '../core/validation';

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Your name is too short')
    .max(70, 'Your name is too Long (70 max chars)')
    .required('Required'),
  email: Yup.string()
    .email('Please use a valid email address')
    .required('Required'),
  password: Yup.string()
    .required('Required')
    .matches(StrongPasswordRegex, 'Must be at least 6 characters, 1 lowercase, 1 uppercase, 1 number, 1 special character and at most 50'),
});

interface SignupFormValues {
  name: string;
  email: string;
  password: string;
}

export const SignupForm: FunctionComponent = () => {
  const sessionContext = useContext(SessionContext);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errors, setErrors] = useState<Array<any>>([]);

  const history = useHistory();

  const hasErrorKey = (key: string): boolean => {
    return errors.filter(error => error.key === key).length > 0;
  };

  const getErrorStyle = (key: string, formikErrors: FormikErrors<SignupFormValues>) => {
    if (hasErrorKey(key) || (formikErrors && {}.hasOwnProperty.call(formikErrors, key))) {
      return {
        border: '2px solid red',
      };
    }
  };

  const handleSubmit = (values: SignupFormValues) => {
    setIsSubmitting(true);
    setErrors([]);

    const { name, email, password } = values;

    axios
      .post('/api/signup', { name, email, password }, { withCredentials: false })
      .then(res => {
        if (res.status === 201) {
          setIsSubmitting(false);
          sessionContext.updateSession(true);
          history.push('/');
        }
      })
      .catch(err => {
        if (err.response.status === 422) {
          setErrors(err.response.data.errors);
        }
        sessionContext.updateSession(false);
        setIsSubmitting(false);
      });
  };

  const initialValues: SignupFormValues = { name: '', email: '', password: '' };

  return (
    <>
      <FormContainer>
        <Formik
          initialValues={initialValues}
          validationSchema={SignupSchema}
          onSubmit={(values: SignupFormValues) => {
            handleSubmit(values);
          }}
        >
          {({ errors: formErrors }: { errors: FormikErrors<SignupFormValues> }): JSX.Element => (
            <Form>
              <FormGroup direction="column">
                <label htmlFor="name">Your Name:</label>
                <Field type="name" name="name" placeholder="name" style={getErrorStyle('name', formErrors)} />
                <ErrorMessage name="name" component="span" />
              </FormGroup>
              <FormGroup direction="column">
                <label htmlFor="email">Email:</label>
                <Field type="email" name="email" placeholder="email" style={getErrorStyle('email', formErrors)} />
                <ErrorMessage name="email" component="span" />
              </FormGroup>
              <FormGroup direction="column">
                <label htmlFor="password">Password:</label>
                <Field type="password" name="password" placeholder="password" style={getErrorStyle('password', formErrors)} />
                <ErrorMessage name="password" component="span" />
              </FormGroup>
              {errors.length >0 && (
                <>
                  <FormGroup>
                    {errors.map(error => (
                      <p key={error.key} style={{ color: 'red' }}>
                        {error.message}
                      </p>
                    ))}
                  </FormGroup>
                  <p style={{ textAlign: 'left', fontWeight: 'bold' }}>Please update the form to continue.</p>
                </>
              )}
              <StyledFloatButton type="submit" disabled={isSubmitting}>
                Register
              </StyledFloatButton>
            </Form>
          )}
        </Formik>
      </FormContainer>
    </>
  );
};
