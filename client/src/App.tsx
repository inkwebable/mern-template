import { GlobalStyles } from './assets/styles';
import { AppHeader } from './modules/appHeader';
import { SessionContext } from './modules/auth/session';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import styled from 'styled-components';

import { AppRouter } from './app/app-router';
import { hasSession } from './modules/auth/session';

const AppContainer = styled.main`
  text-align: center;
`;

const App = (): JSX.Element => {
  const [session, updateSession] = React.useState(hasSession());

  return (
    <>
      <GlobalStyles />
      <Router>
        <SessionContext.Provider value={{ session: session, updateSession }}>
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
