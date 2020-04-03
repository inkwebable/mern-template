import { SecureRoute } from 'modules/secureRoute';
import { HomePage, LoginPage, NotFoundPage, ProfilePage } from 'pages';
import React from 'react';
import { Route, Switch } from 'react-router-dom';

export const AppRouter = (): JSX.Element => {
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
