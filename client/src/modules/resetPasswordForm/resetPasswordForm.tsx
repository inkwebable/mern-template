import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { ErrorMessage, Field, Form, Formik, FormikErrors } from 'formik';
import React, { FunctionComponent, SetStateAction, useState } from 'react';
import { useParams } from 'react-router-dom';

import { colors } from '../../assets/styles/settings';
import { StyledFloatButton } from '../core/buttons';
import { FormContainer, FormGroup } from '../core/form';
import { StyledText } from '../core/text';
import { ResetPasswordSchema } from './resetPasswordForm.schema';

interface ResetPasswordFormValues {
  password: string;
  confirmPassword: string;
}

interface ResetPasswordFormProps {
  setShowForm: React.Dispatch<SetStateAction<boolean>>;
}

export const ResetPasswordForm: FunctionComponent<ResetPasswordFormProps> = ({ setShowForm }) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errors, setErrors] = useState<Array<any>>([]);
  const [error, setError] = useState<string>('');

  const { id } = useParams();

  const hasErrorKey = (key: string): boolean => {
    return errors.filter(err => err.key === key).length > 0;
  };

  const getErrorStyle = (key: string, formikErrors: FormikErrors<ResetPasswordFormValues>) => {
    if (hasErrorKey(key) || (formikErrors && {}.hasOwnProperty.call(formikErrors, key))) {
      return {
        border: `2px solid ${colors.error}`,
      };
    }
  };

  const handleSubmit = (values: ResetPasswordFormValues) => {
    setIsSubmitting(true);
    setErrors([]);
    setError('');

    const { password } = values;

    axios
      .put(`/api/password/reset/${id}`, { password })
      .then(res => {
        if (res.status === 200) {
          setShowForm(false);
        }

        setIsSubmitting(false);
      })
      .catch(err => {
        if (err.response.status === 422) {
          setErrors(err.response.data.errors);
        } else {
          setError(err.response.data.error);
        }
        setIsSubmitting(false);
      });
  };

  const initialValues: ResetPasswordFormValues = { password: '', confirmPassword: '' };

  return (
    <>
      <FormContainer>
        <Formik
          initialValues={initialValues}
          validationSchema={ResetPasswordSchema}
          onSubmit={(values: ResetPasswordFormValues) => {
            handleSubmit(values);
          }}
        >
          {({ errors: formErrors }: { errors: FormikErrors<ResetPasswordFormValues> }): JSX.Element => (
            <Form>
              <FormGroup direction="column">
                <label htmlFor="password">New Password:</label>
                <Field type="password" name="password" placeholder="password" style={getErrorStyle('password', formErrors)} />
                <ErrorMessage name="password" component="span" />
              </FormGroup>
              <FormGroup direction="column">
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <Field
                  type="password"
                  name="confirmPassword"
                  placeholder="confirm password"
                  style={getErrorStyle('confirmPassword', formErrors)}
                />
                <ErrorMessage name="confirmPassword" component="span" />
              </FormGroup>
              {errors.length > 0 && (
                <>
                  <FormGroup>
                    {errors.map(err => (
                      <StyledText key={err.key}>{err.message}</StyledText>
                    ))}
                  </FormGroup>
                  <p style={{ textAlign: 'left', fontWeight: 'bold' }}>Please update the form to continue.</p>
                </>
              )}
              <StyledFloatButton type="submit" disabled={isSubmitting}>
                {isSubmitting ? <FontAwesomeIcon icon={faSpinner} spin /> : <>Reset</>}
              </StyledFloatButton>
            </Form>
          )}
        </Formik>
      </FormContainer>
      {error && <StyledText color={colors.error}>{error}</StyledText>}
    </>
  );
};
