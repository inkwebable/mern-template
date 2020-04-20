import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { FlexContainer } from '../../../modules/layout';
import { PageTitle1 } from '../../../modules/page/pages.styled';
import { ResetPasswordForm } from '../../../modules/resetPasswordForm';
import { APIPassword } from '../../../shared/const';

export const PasswordResetPage: React.FunctionComponent = (): JSX.Element => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const { id } = useParams();

  useEffect(() => {
    if (!submitted) {
      axios
        .get(`${APIPassword.Reset}/${id}`)
        .then(res => {
          if (res.status !== 200) {
            setError(res.data.error);
          } else {
            setShowForm(true);
          }

          setSubmitted(true);
          setLoading(false);
        })
        .catch(err => {
          setError(err.response.data.error);
          setSubmitted(true);
          setLoading(false);
          setShowForm(false);
        });
    }
  }, [submitted, id]);

  const result = (): JSX.Element => {
    if (loading) {
      return <p>Checking your token.</p>;
    }

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

    return (
      <p>
        Your password has been updated, please
        <Link to="/login"> login</Link>
      </p>
    );
  };

  return (
    <>
      <PageTitle1>Password Reset</PageTitle1>
      <FlexContainer align="center">{result()}</FlexContainer>
    </>
  );
};
