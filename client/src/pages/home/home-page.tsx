import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { SessionContext } from '../../components/auth/session/sessionContext';
import { PageTitle1 } from '../../components/page/pages.styled';
import AppRoutes from '../../shared/const/routes';

const HomePage = (): JSX.Element => {
  const sessionContext = useContext(SessionContext);

  return (
    <>
      <PageTitle1>Home Page</PageTitle1>
      {sessionContext.session ? (
        <>
          <p>You are logged in.</p>
          <p>
            You can see your profile <Link to={AppRoutes.Profile.Index}>here</Link>
          </p>
        </>
      ) : (
        <p>
          You can login <Link to={AppRoutes.Login.Index}>here</Link> or <Link to={AppRoutes.SignUp.Index}>Sign up</Link> if you don&apos;t
          have an account
        </p>
      )}
    </>
  );
};

export default HomePage;
