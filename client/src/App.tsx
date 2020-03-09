import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import logo from './assets/images/logo.svg';

// Add global styles
const GlobalStyle = createGlobalStyle`
 body {
   margin: 0;
   padding: 0;
   font-family: sans-serif;
 }
`;

const AppContainer = styled.div`
  text-align: center;
`;

const AppHeader = styled.header`
  background-color: #282c34;
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;

const AppTitle = styled.h1`
  font-size: 1.5em;
`;

const AppLink = styled.a`
  color: #61dafb;
`;

const AppLogo = styled.img`
  height: 40vmin;
  pointer-events: none;
  animation: App-logo-spin infinite 20s linear;
  @keyframes App-logo-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @media (prefers-reduced-motion: no-preference) {
    animation: App-logo-spin infinite 20s linear;
  }
`;

const App = (): JSX.Element => {
  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <AppHeader>
          <AppLogo src={logo} className="App-logo" alt="logo" />
          <AppTitle>
            Edit <code>src/App.tsx</code> and save to reload.
          </AppTitle>
          <AppLink href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
            Learn React
          </AppLink>
        </AppHeader>
      </AppContainer>
    </>
  );
};

export default App;
