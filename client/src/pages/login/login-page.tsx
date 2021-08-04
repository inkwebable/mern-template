import { StyledText } from 'components/core/text/text.styled';
import { FlexContainer, MaxWidthContainer } from 'components/layout/layout.styled';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { colors } from '../../assets/styles/settings';
import { LoginForm } from '../../components/loginForm/loginForm';
import { PageTitle1 } from '../../components/page/pages.styled';
import AppRoutes from '../../shared/const/routes';

const LoginPage = (): JSX.Element => {
  const [error, setError] = useState<string>('');

  return (
    <MaxWidthContainer>
      <PageTitle1>Login</PageTitle1>
      <p>
        You can <Link to={AppRoutes.SignUp.Index}>Register</Link> if you don&apos;t have an account.
      </p>
      <FlexContainer align="center">
        <LoginForm setError={setError} />
        {error && <StyledText color={colors.error}>{error}</StyledText>}
        <p>
          <Link to={AppRoutes.Password.Forgotten}>Forgotten your password?</Link>
        </p>
      </FlexContainer>
    </MaxWidthContainer>
  );
};

export default LoginPage;
