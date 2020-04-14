import axios from 'axios';
import React, { FunctionComponent, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { SessionContext } from '../auth/session';
import { FormGroup, LoginButton } from './loginForm.styled';

export const LoginForm: FunctionComponent = () => {
  const sessionContext = useContext(SessionContext);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const history = useHistory();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    axios
      .post('/api/login', { email, password }, { withCredentials: true })
      .then(res => {
        if (res.status === 200) {
          setIsSubmitting(false);
          sessionContext.updateSession(true);
          history.push('/');
        }
      })
      .catch(err => {
        console.log(err);
        sessionContext.updateSession(false);
        setIsSubmitting(false);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormGroup>
        <label htmlFor="email">Username:</label>
        <input
          id="email"
          type="text"
          placeholder="username"
          required
          value={email}
          onChange={(e: React.FormEvent<HTMLInputElement>) => setEmail(e.currentTarget.value)}
        />
      </FormGroup>
      <FormGroup>
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          placeholder="password"
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
