import React, { useContext, useEffect } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';

import { hasSession, SessionContext } from '../modules/auth/session';
import { SecureRoute } from '../modules/secureRoute';
import { HomePage, LoginPage, NotFoundPage, ProfilePage } from '../pages';

export const AppRouter = (): JSX.Element => {
  const location = useLocation();
  const sessionContext = useContext(SessionContext);

  useEffect(() => {
    sessionContext.updateSession(hasSession());
  }, [location]);

  return (
    <Switch>
      <Route exact key="/" path="/" component={HomePage} />
      <Route exact key="/login" path="/login" component={LoginPage} />
      <SecureRoute exact path="/profile">
        <ProfilePage />
      </SecureRoute>
      <Route path="*" component={NotFoundPage} />
    </Switch>
  );
};
