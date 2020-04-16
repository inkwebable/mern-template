import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { colors } from '../../assets/styles/settings';
import { StyledText } from '../../modules/core/text';
import { FlexContainer, MaxWidthContainer } from '../../modules/layout';
import { LoginForm } from '../../modules/loginForm';
import { PageTitle1 } from '../../modules/page/pages.styled';

export const LoginPage = (): JSX.Element => {
  const [error, setError] = useState<string>('');

  return (
    <MaxWidthContainer>
      <PageTitle1>Login</PageTitle1>
      <p>
        You can <Link to="signup">Register</Link> if you don&apos;t have an account.
      </p>
      <FlexContainer align="center">
        <LoginForm setError={setError} />
        {error && <StyledText color={colors.error}>{error}</StyledText>}
        <p><Link to="password/forgotten">Forgotten your password?</Link></p>
      </FlexContainer>
    </MaxWidthContainer>
  );
};
