import React, { FunctionComponent } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

import { hasSession } from '../auth/session';

export const SecureRoute: FunctionComponent<RouteProps> = ({ children, ...rest }) => {
  return (
    <>
      {hasSession() ? (
        <Route {...rest}>{children}</Route>
      ) : (
        <Redirect
          to={{
            pathname: '/login',
          }}
        />
      )}
    </>
  );
};
