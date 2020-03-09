import { GlobalStyles } from 'assets/styles';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import styled from 'styled-components';

import { AppRouter } from './app/app-router';
import { AppHeader } from './modules/header/header';

const AppContainer = styled.div`
  text-align: center;
`;

const App = (): JSX.Element => {
  return (
    <>
      <GlobalStyles />
      <Router>
        <AppHeader />
        <AppContainer>
          <AppRouter />
        </AppContainer>
      </Router>
    </>
  );
};

export default App;
