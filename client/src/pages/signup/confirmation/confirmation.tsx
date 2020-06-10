import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { FlexContainer } from '../../../modules/layout';
import { PageTitle1 } from '../../../modules/page/pages.styled';
import { APISignUp } from '../../../shared/const';
import AppRoutes from '../../../shared/const/routes';

export const ConfirmationPage: React.FunctionComponent = (): JSX.Element => {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [alreadyConfirmed, setAlreadyConfirmed] = useState<boolean>(false);
  const [invalidToken, setInvalidToken] = useState<boolean>(false);
  const [noUser, hasNoUser] = useState<boolean>(false);

  const { id } = useParams();

  useEffect(() => {
    if (!submitting) {
      axios
        .get(`${APISignUp.Confirm}/${id}`)
        .then((res) => {
          if (res.status === 208) {
            setAlreadyConfirmed(true);
          }

          setSubmitting(false);
        })
        .catch((err) => {
          setSubmitting(false);

          if (err.response.status === 404) {
            setInvalidToken(true);
          }
          if (err.response.status === 428) {
            hasNoUser(true);
          }
        });
    }
  }, [submitting, id]);

  if (alreadyConfirmed) {
    return (
      <p>
        You have already registered this email address. You can <Link to={AppRoutes.Login.Index}>Log in</Link>
      </p>
    );
  }

  if (invalidToken) {
    return (
      <p>
        Token not found or expired. Please request a <Link to={AppRoutes.SignUp.Resend}>new verification</Link> email.
      </p>
    );
  }

  if (noUser) {
    return (
      <p>
        No user found. Please <Link to={AppRoutes.SignUp.Index}>sign up</Link> with a valid email.
      </p>
    );
  }

  if (!submitting) {
    return (
      <>
        <PageTitle1>Thank you</PageTitle1>
        <FlexContainer align="center">
          <p>
            Thank you for submitting your email. Please
            <Link to={AppRoutes.Login.Index}> log in</Link>
          </p>
        </FlexContainer>
      </>
    );
  }

  return <p>Please wait while we verify your account.</p>;
};
