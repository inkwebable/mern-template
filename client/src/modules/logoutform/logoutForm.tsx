import axios from 'axios';
import React, { FunctionComponent, useContext, useState } from 'react';

import { SessionContext } from '../auth/session';
import { LogoutButtonLink } from './logoutForm.styled';

export const LogoutForm: FunctionComponent = () => {
  const sessionContext = useContext(SessionContext);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = (event: React.MouseEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    axios
      .get('/api/logout', { withCredentials: true })
      .then(res => {
        console.log('logout', res);
        if (res.status === 200) {
          sessionStorage.clear();
          sessionContext.updateSession(false);
          setIsSubmitting(false);
        }
      })
      .catch(err => {
        console.log(err);
        sessionStorage.clear();
        sessionContext.updateSession(false);
        setIsSubmitting(false);
      })
  };

  return (
    <LogoutButtonLink onClick={handleSubmit} disabled={isSubmitting}>
      Logout
    </LogoutButtonLink>
  );
};
