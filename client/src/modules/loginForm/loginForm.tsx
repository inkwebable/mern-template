import axios from 'axios';
import React, { FunctionComponent, useContext, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { SessionContext } from '../auth/session';
import { FormGroup, LoginButton } from './loginForm.styled';

export const LoginForm: FunctionComponent = () => {
  const sessionContext = useContext(SessionContext);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const history = useHistory();
  const location = useLocation();

  const isLoginScreen = () => {
    return location.pathname === '/login';
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    axios
      .post('http://localhost:5001/api/login', { email, password }, { withCredentials: true })
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          sessionStorage.setItem('session', res.data.role);
          sessionContext.updateSession(true);
          if (isLoginScreen()) {
            history.push('/');
          }
        }
      })
      .catch(err => {
        console.log(err);
        sessionStorage.clear();
        sessionContext.updateSession(false);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormGroup>
        <label>Username: </label>
        <input type="text" required value={email} onChange={(e: React.FormEvent<HTMLInputElement>) => setEmail(e.currentTarget.value)} />
      </FormGroup>
      <FormGroup>
        <label>Password: </label>
        <input
          type="password"
          required
          value={password}
          onChange={(e: React.FormEvent<HTMLInputElement>) => setPassword(e.currentTarget.value)}
        />
      </FormGroup>
      <LoginButton type="submit" disabled={isSubmitting}>
        Login
      </LoginButton>
    </form>
  );
};
