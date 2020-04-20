import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { FlexContainer } from '../../../modules/layout';
import { PageTitle1 } from '../../../modules/page/pages.styled';
import { ResetPasswordForm } from '../../../modules/resetPasswordForm';

export const PasswordResetPage: React.FunctionComponent = (): JSX.Element => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [submitting, isSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const { id } = useParams();

  useEffect(() => {
    if (!submitting) {
      axios
        .get(`/api/password/reset/${id}`)
        .then(res => {
          if (res.status !== 200) {
            setError(res.data.error);
          } else {
            setShowForm(true);
          }

          isSubmitting(false);
        })
        .catch(err => {
          setError(err.response.data.error);
          isSubmitting(false);
          setShowForm(false);
        });
    }
  }, [submitting]);

  const result = (): JSX.Element => {
    if (error) {
      return <p>{error}</p>;
    }

    if (showForm) {
      return (
        <>
          <p>Please enter your new password in the form below.</p>
          <ResetPasswordForm setShowForm={setShowForm} />
        </>
      );
    }

    if (!showForm && !error) {
      return (
        <p>
          Your password has been updated, please
          <Link to="/login"> login</Link>
        </p>
      );
    }

    return <p>Checking your token.</p>;
  };

  return (
    <>
      <PageTitle1>Password Reset</PageTitle1>
      <FlexContainer align="center">{result()}</FlexContainer>
    </>
  );
};
