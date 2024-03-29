import { SessionContext } from 'components/auth/session/sessionContext';
import { StyledSpaLink } from 'components/elements/spaLink/link';
import React, { FunctionComponent } from 'react';
import { useLocation } from 'react-router-dom';

import logo from '../../assets/images/logo.svg';
import { colors } from '../../assets/styles/settings';
import { LogoutForm } from '../logoutform/logoutForm';
import { AppContainerHeader, AppLink, AppLogo, AppTitle, StyledLink } from './appHeader.styled';

export const AppHeader: FunctionComponent = () => {
  const location = useLocation();

  const isLoginScreen = (): boolean => {
    return location.pathname === '/login';
  };

  return (
    <AppContainerHeader data-testid="app-header">
      <AppLogo src={logo} className="App-logo" alt="logo" />
      <AppTitle>
        <StyledLink to="/">MERN</StyledLink>
      </AppTitle>
      <AppLink href="https://github.com/inkwebable/mern-template" target="_blank" rel="noopener noreferrer">
        https://github.com/inkwebable/mern-template
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
