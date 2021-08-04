import { SessionContext } from 'components/auth/session/sessionContext';
import React from 'react';
import { Router } from 'react-router-dom';
import styled from 'styled-components';

import { GlobalStyles } from '../assets/styles';
import { AppHeader } from '../components/appHeader/appHeader';
import { hasSession } from '../components/auth/session/hasSession';
import getHistory from '../shared/helpers/get-history';
import { AppRouter } from './app-router';

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
