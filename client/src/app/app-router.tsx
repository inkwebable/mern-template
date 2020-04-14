import React, { useContext, useEffect } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';

import { hasSession, SessionContext } from '../modules/auth/session';
import { SecureRoute } from '../modules/secureRoute';
import { ConfirmationPage, HomePage, LoginPage, NotFoundPage, ProfilePage, ResendPage, SignUpPage } from '../pages';

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
      <Route exact key="/signup" path="/signup" component={SignUpPage} />
      <Route exact key="/signup/resend" path="/signup/resend" component={ResendPage} />
      <Route exact key="/signup/confirm/:id" path="/signup/confirm/:id" component={ConfirmationPage} />
      <SecureRoute exact path="/profile">
        <ProfilePage />
      </SecureRoute>
      <Route path="*" component={NotFoundPage} />
    </Switch>
  );
};
