import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { lazy, Suspense, useContext, useEffect } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';

import { hasSession } from '../components/auth/session/hasSession';
import { SessionContext } from '../components/auth/session/sessionContext';
import MqttConnector from '../components/mqtt/mqtt-connector';
import { SecureRoute } from '../components/secureRoute/secureRoute';
import AppRoutes from '../shared/const/routes';

const HomePage = lazy(() => import('../pages/home/home-page'));
const LoginPage = lazy(() => import('../pages/login/login-page'));
const RequestPasswordResetPage = lazy(() => import('../pages/request-password-reset/request-password-reset'));
const PasswordResetPage = lazy(() => import('../pages/password-reset/password-reset-page'));
const SignUpPage = lazy(() => import('../pages/signup/signup-page'));
const ResendPage = lazy(() => import('../pages/signup/resend/resend-page'));
const ConfirmationPage = lazy(() => import('../pages/signup/confirmation/confirmation-page'));
const ProfilePage = lazy(() => import('../pages/profile/profile-page'));
const NotFoundPage = lazy(() => import('../pages/errors/not-found/not-found-page'));

export const AppRouter = (): JSX.Element => {
  const location = useLocation();
  const sessionContext = useContext(SessionContext);

  useEffect(() => {
    sessionContext.updateSession(hasSession());
  }, [location, sessionContext]);

  return (
    <Suspense fallback={<FontAwesomeIcon icon={faSpinner} />}>
      <Switch>
        <Route exact key={AppRoutes.Home.Index} path={AppRoutes.Home.Index} component={HomePage} />
        <Route exact key={AppRoutes.Login.Index} path={AppRoutes.Login.Index} component={LoginPage} />
        <Route exact key={AppRoutes.Password.Forgotten} path={AppRoutes.Password.Forgotten} component={RequestPasswordResetPage} />
        <Route exact key={AppRoutes.Password.Reset} path={AppRoutes.Password.Reset} component={PasswordResetPage} />
        <Route exact key={AppRoutes.SignUp.Index} path={AppRoutes.SignUp.Index} component={SignUpPage} />
        <Route exact key={AppRoutes.SignUp.Resend} path={AppRoutes.SignUp.Resend} component={ResendPage} />
        <Route exact key={AppRoutes.SignUp.Confirm} path={AppRoutes.SignUp.Confirm} component={ConfirmationPage} />
        <MqttConnector>
          <SecureRoute exact key={AppRoutes.Profile.Index} path={AppRoutes.Profile.Index}>
            <ProfilePage />
          </SecureRoute>
        </MqttConnector>
        <Route path="*" component={NotFoundPage} />
      </Switch>
    </Suspense>
  );
};
