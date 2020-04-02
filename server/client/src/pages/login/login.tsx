import { LoginForm } from 'modules/loginForm/loginForm';
import React from 'react';

import { FlexContainer, MaxWidthContainer } from '../../modules/layout/layout.styled';
import { LoginFormContainer } from '../../modules/loginForm/loginForm.styled';
import { PageTitle1, PageTitle2 } from '../../modules/page/pages.styled';

// import { ContainerStyled } from '@modules/core/container';
// import { FlexContainer } from '@modules/core/flex-container';

export const LoginPage = (): JSX.Element => (
  <MaxWidthContainer>
    <PageTitle1>Login</PageTitle1>
    <br />
    <FlexContainer align="center">
      <LoginFormContainer>
        <LoginForm />
      </LoginFormContainer>
    </FlexContainer>
  </MaxWidthContainer>
);
