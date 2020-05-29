import React, { useContext, useEffect } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';

import { hasSession, SessionContext } from '../modules/auth/session';
import { SecureRoute } from '../modules/secureRoute';
import { HomePage, LoginPage, NotFoundPage, ProfilePage, SignUpPage } from '../pages';
import AppRoutes from '../shared/const/routes';

export const AppRouter = (): JSX.Element => {
  const location = useLocation();
  const sessionContext = useContext(SessionContext);

  useEffect(() => {
    sessionContext.updateSession(hasSession());
  }, [location, sessionContext]);

  return (
    <Switch>
      <Route exact key={AppRoutes.Home.Index} path={AppRoutes.Home.Index} component={HomePage} />
      <Route exact key={AppRoutes.Login.Index} path={AppRoutes.Login.Index} component={LoginPage} />
      <Route exact key={AppRoutes.SignUp.Index} path={AppRoutes.SignUp.Index} component={SignUpPage} />
      <SecureRoute exact key={AppRoutes.Profile.Index} path={AppRoutes.Profile.Index}>
        <ProfilePage />
      </SecureRoute>
      <Route path="*" component={NotFoundPage} />
    </Switch>
  );
};
