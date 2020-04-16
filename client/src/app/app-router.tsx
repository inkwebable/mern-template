import React, { useContext, useEffect } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';

import { hasSession, SessionContext } from '../modules/auth/session';
import { SecureRoute } from '../modules/secureRoute';
import {
  ConfirmationPage,
  HomePage,
  LoginPage,
  NotFoundPage, PasswordResetPage,
  ProfilePage,
  RequestPasswordResetPage,
  ResendPage,
  SignUpPage,
} from '../pages';

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
      <Route exact key="/password/forgotten" path="/password/forgotten" component={RequestPasswordResetPage} />
      <Route exact key="/password/reset/:id" path="/password/reset/:id" component={PasswordResetPage} />
      <Route exact key="/signup" path="/signup" component={SignUpPage} />
      <Route exact key="/signup/confirm/resend" path="/signup/confirm/resend" component={ResendPage} />
      <Route exact key="/signup/confirm/:id" path="/signup/confirm/:id" component={ConfirmationPage} />
      <SecureRoute exact path="/profile">
        <ProfilePage />
      </SecureRoute>
      <Route path="*" component={NotFoundPage} />
    </Switch>
  );
};
