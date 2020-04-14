import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { SessionContext } from '../../modules/auth/session';
import { PageTitle1 } from '../../modules/page/pages.styled';

export const HomePage = (): JSX.Element => {
  const sessionContext = useContext(SessionContext);

  return (
    <>
      <PageTitle1>Home Page</PageTitle1>
      {sessionContext.session ? (
        <>
          <p>You are logged in.</p>
          <p>
            You can see your profile <Link to="/profile">here</Link>
          </p>
        </>
      ) : (
        <p>
          You can login <Link to="/login">here</Link> or <Link to="signup">Sign up</Link> if you don&apos;t have an account
        </p>
      )}
    </>
  );
};
