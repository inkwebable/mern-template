import React from 'react';
import { Router } from 'react-router-dom';
import styled from 'styled-components';

import { AppRouter } from './app/app-router';
import { GlobalStyles } from './assets/styles';
import { AppHeader } from './modules/appHeader';
import { hasSession, SessionContext } from './modules/auth/session';
import getHistory from './utils/history';

const AppContainer = styled.main`
  text-align: center;
`;

const App = (): JSX.Element => {
  const [session, updateSession] = React.useState(hasSession());

  return (
    <>
      <GlobalStyles />
      <Router history={getHistory()}>
        <SessionContext.Provider value={{ session, updateSession }}>
          <AppHeader />
          <AppContainer>
            <AppRouter />
          </AppContainer>
        </SessionContext.Provider>
      </Router>
    </>
  );
};

export default App;
