import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import styled from 'styled-components';

import { AppRouter } from './app/app-router';
import { GlobalStyles } from './assets/styles';
import { AppHeader } from './modules/appHeader';
import { hasSession, SessionContext } from './modules/auth/session';
import { store } from './store/store';
import getHistory from './utils/history';

const AppContainer = styled.main`
  text-align: center;
`;

const App = (): JSX.Element => {
  const [session, updateSession] = React.useState(hasSession());

  return (
    <Provider store={store}>
      <GlobalStyles />
      <Router history={getHistory()}>
        <SessionContext.Provider value={{ session, updateSession }}>
          <AppHeader />
          <AppContainer>
            <AppRouter />
          </AppContainer>
        </SessionContext.Provider>
      </Router>
    </Provider>
  );
};

export default App;
