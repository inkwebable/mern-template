import React from 'react';

import { PageTitle1 } from '../../modules/page/pages.styled';
import { SignupForm } from '../../modules/registerForm';
import { FlexContainer } from '../../modules/layout';

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
