import React, { useState } from 'react';

import { FlexContainer } from '../../../modules/layout';
import { PageTitle1 } from '../../../modules/page/pages.styled';
import { VerifyEmailForm } from '../../../modules/verifyEmailForm';

export const RequestPasswordResetPage = (): JSX.Element => {
  const [showForm, setShowForm] = useState<boolean>(false);

  return (
    <>
      <PageTitle1>Request Password Reset </PageTitle1>
      {showForm ? (
        <p>If you have registered with us you will receive an email shortly.</p>
      ) : (
        <FlexContainer align="center">
          <p>Please fill in the form below.</p>
          <VerifyEmailForm showForm={setShowForm} postUrl="/api/password/forgotten" />
        </FlexContainer>
      )}
    </>
  );
};
