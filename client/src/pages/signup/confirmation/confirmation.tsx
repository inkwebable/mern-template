import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { FlexContainer } from '../../../modules/layout';
import { PageTitle1 } from '../../../modules/page/pages.styled';

export const ConfirmationPage: React.FunctionComponent = (): JSX.Element => {
  const [finished, isFinished] = useState<boolean>(false);
  const [confirming, isConfirming] = useState<boolean>(false);
  const [alreadyConfirmed, isAlreadyConfirmed] = useState<boolean>(false);
  const [invalidToken, hasInvalidToken] = useState<boolean>(false);

  const { id } = useParams();

  useEffect(() => {
    if (!finished && !confirming) {
      isConfirming(true);
      axios
        .get(`/api/signup/confirm/${id}`)
        .then(res => {
          if (res.status === 208) {
            isAlreadyConfirmed(true);
          }

          isFinished(true);
          isConfirming(false);
        })
        .catch(err => {
          isFinished(true);
          isConfirming(false);
          console.log('confirmation err', err);
          if (err.response.status === 404) {
            hasInvalidToken(true);
          }
        });
    }
  }, [finished, confirming]);

  if (alreadyConfirmed) {
    return (
      <p>
        You have already registered this email address.
        {' '}
        <Link to="/login">Log in</Link>
      </p>
    );
  }

  if (invalidToken) {
    return <p>Token not found or expired. Please request a <Link to="/verification/resend">new verification </Link> email.</p>;
  }

  if (finished && !confirming) {
    return (
      <>
        <PageTitle1>Thank you</PageTitle1>
        <FlexContainer align="center">
          <p>
            Thank you for confirming your email. Please
            <Link to="/login"> log in</Link>
          </p>
        </FlexContainer>
      </>
    );
  }

  return <p>Please wait while we verify your account.</p>;
};
