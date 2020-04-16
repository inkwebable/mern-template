import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { ErrorMessage, Field, Form, Formik, FormikErrors, FormikState } from 'formik';
import React, { FunctionComponent, SetStateAction, useContext, useState } from 'react';

import { colors } from '../../assets/styles/settings';
import { SessionContext } from '../auth/session';
import { StyledFloatButton } from '../core/buttons';
import { FormContainer, FormGroup } from '../core/form';
import { StyledText } from '../core/text';
import { VerifyEmailFormSchema } from './veriftEmailForm.schema';

interface VerifyFormValues {
  email: string;
}

interface VerifyEmailFormProps {
  postUrl: string;
  showForm: React.Dispatch<SetStateAction<boolean>>;
}

export const VerifyEmailForm: FunctionComponent<VerifyEmailFormProps> = ({ showForm, postUrl }) => {
  const sessionContext = useContext(SessionContext);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errors, setErrors] = useState<Array<any>>([]);
  const [error, setError] = useState<string>('');

  const hasErrorKey = (key: string): boolean => {
    return errors.filter(err => err.key === key).length > 0;
  };

  const getErrorStyle = (key: string, formikErrors: FormikErrors<VerifyFormValues>) => {
    if (hasErrorKey(key) || (formikErrors && {}.hasOwnProperty.call(formikErrors, key))) {
      return {
        border: `2px solid ${colors.error}`,
      };
    }
  };

  const handleSubmit = (values: VerifyFormValues, resetForm: (nextState?: Partial<FormikState<VerifyFormValues>>) => void) => {
    setIsSubmitting(true);
    setErrors([]);
    setError('');

    const { email } = values;

    axios
      .post(postUrl, { email })
      .then(res => {
        if (res.status === 200) {
          setIsSubmitting(false);
          resetForm();
          showForm(true);
        }
      })
      .catch(err => {
        if (err.response.status === 422) {
          setErrors(err.response.data.errors);
        } else {
          setError(err.response.data.error);
        }

        sessionContext.updateSession(false);
        setIsSubmitting(false);
      });
  };

  const initialValues: VerifyFormValues = { email: '' };

  return (
    <>
      <FormContainer>
        <Formik
          initialValues={initialValues}
          validationSchema={VerifyEmailFormSchema}
          onSubmit={(values: VerifyFormValues, { resetForm }): void => {
            handleSubmit(values, resetForm);
          }}
        >
          {({ errors: formErrors }: { errors: FormikErrors<VerifyFormValues> }): JSX.Element => (
            <Form>
              <FormGroup direction="column">
                <label htmlFor="email">Email:</label>
                <Field type="email" name="email" placeholder="email" style={getErrorStyle('email', formErrors)} />
                <ErrorMessage name="email" component="span" />
              </FormGroup>
              {errors.length > 0 && (
                <>
                  <FormGroup>
                    {errors.map(err => (
                      <StyledText key={err.key} color={colors.error}>
                        {err.message}
                      </StyledText>
                    ))}
                  </FormGroup>
                  <p style={{ textAlign: 'left', fontWeight: 'bold' }}>Please update the form to continue.</p>
                </>
              )}
              <StyledFloatButton type="submit" disabled={isSubmitting}>
                {isSubmitting ? <FontAwesomeIcon icon={faSpinner} spin /> : <>Submit</>}
              </StyledFloatButton>
            </Form>
          )}
        </Formik>
      </FormContainer>
      {error && <StyledText color={colors.error}>{error}</StyledText>}
    </>
  );
};
