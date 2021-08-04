import { act, render, screen, waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';

import { LoginPage, ProfilePage } from '../../pages';
import AppRoutes from '../../shared/const/routes';
import { SecureRoute } from './secureRoute';

describe('The Private Route Component', () => {
  it('shows the login page when user is not logged in', async () => {
    const history = createMemoryHistory();
    const route = `${AppRoutes.Profile.Index}`;
    history.push(route);

    await act(async () => {
      render(
        <Router history={history}>
          <Switch>
            <Route exact key={AppRoutes.Login.Index} path={AppRoutes.Login.Index} component={LoginPage} />
            <SecureRoute path="/" component={ProfilePage} />
          </Switch>
        </Router>,
      );

      await waitFor(() => expect(screen.getByTestId('login-container')).toBeDefined());
    });
  });
});
