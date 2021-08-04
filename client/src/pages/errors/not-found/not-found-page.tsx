import React, { FunctionComponent } from 'react';
import { useLocation } from 'react-router-dom';

const NotFoundPage: FunctionComponent = (): JSX.Element => {
  const location = useLocation();

  return (
    <div>
      <p>We&rsquo;re sorry, but the page you&rsquo;ve tried to visit{location.pathname} cannot be found.</p>
    </div>
  );
};

export default NotFoundPage;
