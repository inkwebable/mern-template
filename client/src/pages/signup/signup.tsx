import React, { useState } from 'react';

import { FlexContainer } from '../../modules/layout';
import { PageTitle1 } from '../../modules/page/pages.styled';
import { RegisterForm } from '../../modules/registerForm';

export const SignUpPage = (): JSX.Element => {
  const [showForm, setShowForm] = useState<boolean>(false);

  return (
    <>
      <PageTitle1>Sign Up</PageTitle1>
      <FlexContainer align="center">
        {showForm ? (
          <p>Please verify your email address via the email we have sent you.</p>
        ) : (
          <>
            <p>Please fill in the form below to get started.</p>
            <RegisterForm setShowForm={setShowForm} />
          </>
        )}
      </FlexContainer>
    </>
  );
};
