import React from 'react';

import { FlexContainer, MaxWidthContainer } from '../../modules/layout/layout.styled';
import { LoginForm } from '../../modules/loginForm';
import { LoginFormContainer } from '../../modules/loginForm/loginForm.styled';
import { PageTitle1 } from '../../modules/page/pages.styled';
import { Link } from 'react-router-dom';

export const LoginPage = (): JSX.Element => (
  <MaxWidthContainer>
    <PageTitle1>Login</PageTitle1>
    <p>You can <Link to="signup">Register</Link> if you don't have an account.</p>
    <FlexContainer align="center">
      <LoginFormContainer>
        <LoginForm />
      </LoginFormContainer>
    </FlexContainer>
  </MaxWidthContainer>
);
