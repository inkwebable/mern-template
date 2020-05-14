import React, { FunctionComponent } from 'react';
import { useLocation } from 'react-router-dom';

import logo from '../../assets/images/logo.svg';
import { colors } from '../../assets/styles/settings';
import { SessionContext } from '../auth/session';
import { StyledSpaLink } from '../elements/spaLink';
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
