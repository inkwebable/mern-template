import axios from 'axios';
import React, { FunctionComponent, useContext, useState } from 'react';

import { APILogout } from '../../shared/const';
import { SessionContext } from '../auth/session';
import { LogoutButtonLink } from './logoutForm.styled';

export const LogoutForm: FunctionComponent = () => {
  const sessionContext = useContext(SessionContext);
  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleSubmit = (event: React.MouseEvent) => {
    event.preventDefault();
    setSubmitting(true);

    axios
      .get(APILogout.Index, { withCredentials: true })
      .then(res => {
        if (res.status === 200) {
          sessionStorage.clear();
          sessionContext.updateSession(false);
          setSubmitting(false);
        }
      })
      .catch(err => {
        sessionStorage.clear();
        sessionContext.updateSession(false);
        setSubmitting(false);
      });
  };

  return (
    <LogoutButtonLink onClick={handleSubmit} disabled={submitting}>
      Logout
    </LogoutButtonLink>
  );
};
