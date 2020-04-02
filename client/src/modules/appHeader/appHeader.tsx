import { SessionContext } from 'modules/auth/session';
import React, { FunctionComponent } from 'react';
import { Link, useLocation } from 'react-router-dom';

import logo from '../../assets/images/logo.svg';
import { colors } from '../../assets/styles/settings';
import { StyledSpaLink } from '../elements/spaLink';
import { LoginForm } from '../loginForm';
import { LogoutForm } from '../logoutform';
import { AppContainerHeader, AppLink, AppLogo, AppTitle, StyledLink } from './appHeader.styled';

export const AppHeader: FunctionComponent = () => {
  const location = useLocation();

  const isLoginScreen = (): boolean => {
    return location.pathname === '/login';
  };

  return (
    <AppContainerHeader>
      <AppLogo src={logo} className="App-logo" alt="logo" />
      <AppTitle>
        <StyledLink to="/">MERN</StyledLink>
      </AppTitle>
      <AppLink href="https://github.com/inkwebable/mern" target="_blank" rel="noopener noreferrer">
        https://github.com/inkwebable/mern
      </AppLink>
      <SessionContext.Consumer>
        {({ session }): JSX.Element | false =>
          !session && !isLoginScreen() ? (
            <>
              <br />
              <StyledSpaLink to="/login" color={colors.white} decoration="underline">
                {' '}
                Login
              </StyledSpaLink>
            </>
          ) : (
            session && (
              <>
                <br />
                <LogoutForm />
              </>
            )
          )
        }
      </SessionContext.Consumer>
    </AppContainerHeader>
  );
};