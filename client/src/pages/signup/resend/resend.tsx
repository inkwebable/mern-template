import React, { useState } from 'react';

import { FlexContainer } from '../../../modules/layout';
import { PageTitle1 } from '../../../modules/page/pages.styled';
import { VerifyEmailForm } from '../../../modules/verifyEmailForm';

export const ResendPage = (): JSX.Element => {
  const [showForm, setShowForm] = useState<boolean>(true);

  return (
    <>
      <PageTitle1>Re-send Verification Email</PageTitle1>
      {!showForm ? (
        <p>If you have registered with us you will receive an email shortly.</p>
      ) : (
        <FlexContainer align="center">
          <p>Please fill in the form below.</p>
          <VerifyEmailForm showForm={setShowForm} postUrl="/api/signup/confirm/resend" />
        </FlexContainer>
      )}
    </>
  );
};
