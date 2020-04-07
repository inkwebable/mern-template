import React from 'react';

import { FlexContainer } from '../../modules/layout';
import { PageTitle1 } from '../../modules/page/pages.styled';
import { SignupForm } from '../../modules/registerForm';

export const RegisterPage = (): JSX.Element => {
  return (
    <>
      <PageTitle1>Register</PageTitle1>
      <p>Please fill in the form below to get started.</p>
      <FlexContainer align="center">
        <SignupForm />
      </FlexContainer>
    </>
  );
};
