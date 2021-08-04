import { FlexContainer } from 'components/layout/layout.styled';
import React, { useState } from 'react';

import { PageTitle1 } from '../../../components/page/pages.styled';
import { VerifyEmailForm } from '../../../components/verifyEmailForm/verifyEmailForm';
import { APISignUp } from '../../../shared/const';

const ResendPage = (): JSX.Element => {
  const [showForm, setShowForm] = useState<boolean>(true);

  return (
    <>
      <PageTitle1>Re-send Verification Email</PageTitle1>
      {!showForm ? (
        <p>If you have registered with us you will receive an email shortly.</p>
      ) : (
        <FlexContainer align="center">
          <p>Please fill in the form below.</p>
          <VerifyEmailForm showForm={setShowForm} postUrl={APISignUp.Resend} />
        </FlexContainer>
      )}
    </>
  );
};

export default ResendPage;
