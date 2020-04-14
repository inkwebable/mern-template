import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { ErrorMessage, Field, Form, Formik, FormikErrors, FormikState } from 'formik';
import React, { FunctionComponent, SetStateAction, useContext, useState } from 'react';

import { SessionContext } from '../auth/session';
import { StyledFloatButton } from '../core/buttons';
import { FormContainer, FormGroup } from '../core/form';
import { VerifyEmailFormSchema } from './veriftEmailForm.schema';

interface VerifyFormValues {
  email: string;
}

interface VerifyEmailFormProps {
  showForm: React.Dispatch<SetStateAction<boolean>>;
}

export const VerifyEmailForm: FunctionComponent<VerifyEmailFormProps> = ({ showForm }) => {
  const sessionContext = useContext(SessionContext);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errors, setErrors] = useState<Array<any>>([]);

  const hasErrorKey = (key: string): boolean => {
    return errors.filter(error => error.key === key).length > 0;
  };

  const getErrorStyle = (key: string, formikErrors: FormikErrors<VerifyFormValues>) => {
    if (hasErrorKey(key) || (formikErrors && {}.hasOwnProperty.call(formikErrors, key))) {
      return {
        border: '2px solid red',
      };
    }
  };

  const handleSubmit = (values: VerifyFormValues, resetForm: (nextState?: Partial<FormikState<VerifyFormValues>>) => void) => {
    setIsSubmitting(true);
    setErrors([]);

    const { email } = values;

    axios
      .post('/api/signup/resend', { email }, { withCredentials: false })
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
                {isSubmitting ? <FontAwesomeIcon icon={faSpinner} spin /> : <>Submit</>}
              </StyledFloatButton>
            </Form>
          )}
        </Formik>
      </FormContainer>
    </>
  );
};
