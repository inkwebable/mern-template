import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { ErrorMessage, Field, Form, Formik, FormikErrors } from 'formik';
import React, { FunctionComponent, SetStateAction, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { colors } from '../../assets/styles/settings';
import { APISignUp } from '../../shared/const';
import { SessionContext } from '../auth/session';
import { StyledFloatButton } from '../core/buttons';
import { FormContainer, FormGroup } from '../core/form';
import { StyledText } from '../core/text';
import { RegisterSchema } from './registerForm.schema';

interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface RegisterFormProps {
  setShowForm: React.Dispatch<SetStateAction<boolean>>;
}

export const RegisterForm: FunctionComponent<RegisterFormProps> = ({ setShowForm }) => {
  const sessionContext = useContext(SessionContext);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [errors, setErrors] = useState<Array<any>>([]);

  const history = useHistory();

  const hasErrorKey = (key: string): boolean => {
    return errors.filter(error => error.key === key).length > 0;
  };

  const getErrorStyle = (key: string, formikErrors: FormikErrors<RegisterFormValues>) => {
    if (hasErrorKey(key) || (formikErrors && {}.hasOwnProperty.call(formikErrors, key))) {
      return {
        border: `2px solid ${colors.error}`,
      };
    }
  };

  const handleSubmit = (values: RegisterFormValues) => {
    setSubmitting(true);
    setErrors([]);

    const { name, email, password } = values;

    axios
      .post(APISignUp.Index, { name, email, password }, { withCredentials: false })
      .then(res => {
        if (res.status === 201) {
          setSubmitting(false);
          if (!res.data.redirect) {
            sessionContext.updateSession(true);
            history.push('/');
          } else {
            setShowForm(true);
          }
        }
      })
      .catch(err => {
        if (err.response.status === 422) {
          setErrors(err.response.data.errors);
        }
        sessionContext.updateSession(false);
        setSubmitting(false);
      });
  };

  const initialValues: RegisterFormValues = { name: '', email: '', password: '', confirmPassword: '' };

  return (
    <>
      <FormContainer>
        <Formik
          initialValues={initialValues}
          validationSchema={RegisterSchema}
          onSubmit={(values: RegisterFormValues) => {
            handleSubmit(values);
          }}
        >
          {({ errors: formErrors }: { errors: FormikErrors<RegisterFormValues> }): JSX.Element => (
            <Form>
              <FormGroup direction="column">
                <label htmlFor="name">Your Name:</label>
                <Field type="name" name="name" placeholder="name" style={getErrorStyle('name', formErrors)} />
                <ErrorMessage name="name" component="span" />
              </FormGroup>
              <FormGroup direction="column">
                <label htmlFor="email">Email:</label>
                <Field type="email" name="email" placeholder="email" autoComplete="username" style={getErrorStyle('email', formErrors)} />
                <ErrorMessage name="email" component="span" />
              </FormGroup>
              <FormGroup direction="column">
                <label htmlFor="password">Password:</label>
                <Field
                  type="password"
                  name="password"
                  placeholder="password"
                  autoComplete="new-password"
                  style={getErrorStyle('password', formErrors)}
                />
                <ErrorMessage name="password" component="span" />
              </FormGroup>
              <FormGroup direction="column">
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <Field
                  type="password"
                  name="confirmPassword"
                  placeholder="confirm password"
                  autoComplete="confirm-password"
                  style={getErrorStyle('confirmPassword', formErrors)}
                />
                <ErrorMessage name="confirmPassword" component="span" />
              </FormGroup>
              {errors.length > 0 && (
                <>
                  <FormGroup>
                    {errors.map(error => (
                      <StyledText key={error.key} color={colors.error}>
                        {error.message}
                      </StyledText>
                    ))}
                  </FormGroup>
                  <p style={{ textAlign: 'left', fontWeight: 'bold' }}>Please update the form to continue.</p>
                </>
              )}
              <StyledFloatButton type="submit" disabled={submitting}>
                {submitting ? <FontAwesomeIcon icon={faSpinner} spin /> : <>Register</>}
              </StyledFloatButton>
            </Form>
          )}
        </Formik>
      </FormContainer>
    </>
  );
};
