import React, { FunctionComponent } from 'react';

import logo from '../../assets/images/logo.svg';
import { AppContainerHeader, AppLink, AppLogo, AppTitle } from './header.styled';

export const AppHeader: FunctionComponent = () => {
  return (
    <AppContainerHeader>
      <AppLogo src={logo} className="App-logo" alt="logo" />
      <AppTitle>MERN</AppTitle>
      <AppLink href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
        https://github.com/inkwebable/mern
      </AppLink>
    </AppContainerHeader>
  );
};
