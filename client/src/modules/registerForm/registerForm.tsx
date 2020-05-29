import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { ErrorMessage, Field, Form, Formik, FormikErrors } from 'formik';
import React, { FunctionComponent, SetStateAction, useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { colors } from '../../assets/styles/settings';
import { SessionContext } from '../auth/session';
import { StyledFloatButton } from '../core/buttons';
import { FormContainer, FormGroup } from '../core/form';
import { StyledText } from '../core/text';
import { RegisterSchema } from './registerForm.schema';
import { registerLoadingState, registerUser } from './dux/registerReducer';

interface RegisterFormValues {
  username: string;
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

  const loading = useSelector(registerLoadingState);
  const dispatch = useDispatch();

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

  const handleSubmit = async (values: RegisterFormValues) => {
    setSubmitting(true);
    setErrors([]);

    const { username, password } = values;

    // @ts-ignore
    const resultAction = await dispatch(registerUser({ username, password }));

    if (registerUser.fulfilled.match(resultAction)) {
      setSubmitting(false);
      sessionContext.updateSession(true);
      history.push('/');
    } else {
      setSubmitting(false);
      setErrors(resultAction.payload.errors);
    }

  };

  const initialValues: RegisterFormValues = { username: '', password: '', confirmPassword: '' };

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
                <label htmlFor="username">Your Username:</label>
                <Field type="username" name="username" placeholder="username" style={getErrorStyle('username', formErrors)} />
                <ErrorMessage name="username" component="span" />
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
                {submitting || loading === 'pending' ? <FontAwesomeIcon icon={faSpinner} spin /> : <>Register</>}
              </StyledFloatButton>
            </Form>
          )}
        </Formik>
      </FormContainer>
    </>
  );
};
