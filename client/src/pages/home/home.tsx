import { LoginForm } from 'modules/loginForm/login';
import React from 'react';

import { PageTitle1, PageTitle2 } from '../../modules/page/pages.styled';

// import { ContainerStyled } from '@modules/core/container';
// import { FlexContainer } from '@modules/core/flex-container';

export const HomePage = (): JSX.Element => (
  <>
    <PageTitle1>Home Page</PageTitle1>
    <LoginForm />
  </>
);
