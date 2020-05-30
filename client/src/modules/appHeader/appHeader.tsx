import React, { FunctionComponent } from 'react';
import { useLocation } from 'react-router-dom';

import logo from '../../assets/images/logo.svg';
import { colors, fontSizes } from '../../assets/styles/settings';
import { SessionContext } from '../auth/session';
import { StyledSpaLink } from '../elements/spaLink';
import { LogoutForm } from '../logoutform';
import { AppContainerHeader, AppLogo, AppTitle, StyledLink } from './appHeader.styled';

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
      <SessionContext.Consumer>
        {({ session }): JSX.Element | false =>
          !session && !isLoginScreen() ? (
            <StyledSpaLink style={{ fontSize: fontSizes.l }} to="/login" color={colors.primary} decoration="underline">
              {' '}
              Login
            </StyledSpaLink>
          ) : (
            session && (
              <>
                <LogoutForm />
              </>
            )
          )
        }
      </SessionContext.Consumer>
    </AppContainerHeader>
  );
};
