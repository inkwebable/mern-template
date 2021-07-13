import axios from 'axios';
import React, { SetStateAction, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { APILogin } from '../../shared/const';
import AppRoutes from '../../shared/const/routes';
import { SessionContext } from '../auth/session';
import { StyledFloatButton } from '../core/buttons';
import { FormContainer, FormGroup } from '../core/form';

interface LoginFormProps {
  setError: React.Dispatch<SetStateAction<string>>;
}

export const LoginForm: React.FunctionComponent<LoginFormProps> = ({ setError }) => {
  const sessionContext = useContext(SessionContext);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);

  const history = useHistory();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError('');

    axios
      .post(APILogin.Index, { email, password }, { withCredentials: true })
      .then((res) => {
        if (res.status === 200) {
          setSubmitting(false);
          sessionContext.updateSession(true);
          history.push(AppRoutes.Home.Index);
        }
      })
      .catch((err) => {
        if (err.response.data && {}.hasOwnProperty.call(err.response.data, 'message')) {
          setError(err.response.data.message);
        } else {
          setError(err.message);
        }

        sessionContext.updateSession(false);
        setSubmitting(false);
      });
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <label htmlFor="email">Username:</label>
          <input
            id="email"
            type="text"
            placeholder="username"
            required
            autoComplete="username"
            value={email}
            onChange={(e: React.FormEvent<HTMLInputElement>): void => setEmail(e.currentTarget.value)}
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            placeholder="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e: React.FormEvent<HTMLInputElement>): void => setPassword(e.currentTarget.value)}
          />
        </FormGroup>
        <StyledFloatButton type="submit" disabled={submitting}>
          Login
        </StyledFloatButton>
      </form>
    </FormContainer>
  );
};
