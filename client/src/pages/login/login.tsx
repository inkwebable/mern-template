import React from 'react';
import { Link } from 'react-router-dom';

import { FlexContainer, MaxWidthContainer } from '../../modules/layout';
import { LoginForm } from '../../modules/loginForm';
import { LoginFormContainer } from '../../modules/loginForm/loginForm.styled';
import { PageTitle1 } from '../../modules/page/pages.styled';

export const LoginPage = (): JSX.Element => (
  <MaxWidthContainer>
    <PageTitle1>Login</PageTitle1>
    <p>
      You can <Link to="signup">Register</Link> if you don&apos;t have an account.
    </p>
    <FlexContainer align="center">
      <LoginFormContainer>
        <LoginForm />
      </LoginFormContainer>
    </FlexContainer>
  </MaxWidthContainer>
);
