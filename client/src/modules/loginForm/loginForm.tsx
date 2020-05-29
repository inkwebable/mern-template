import React, { SetStateAction, useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import AppRoutes from '../../shared/const/routes';
import { authLoadingState, logUserIn } from '../auth/dux/authReducer';
import { SessionContext } from '../auth/session';
import { StyledFloatButton } from '../core/buttons';
import { FormContainer, FormGroup } from '../core/form';

interface LoginFormProps {
  setError: React.Dispatch<SetStateAction<string>>;
}

export const LoginForm: React.FunctionComponent<LoginFormProps> = ({ setError }) => {
  const sessionContext = useContext(SessionContext);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);

  const loading = useSelector(authLoadingState);
  const dispatch = useDispatch();

  const history = useHistory();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setSubmitting(true);
    setError('');

    // @ts-ignore
    const resultAction = await dispatch(logUserIn({ username, password }));

    if (logUserIn.fulfilled.match(resultAction)) {
      setSubmitting(false);
      sessionContext.updateSession(true);
      history.push(AppRoutes.Home.Index);
    } else {
      if (resultAction.payload) {
        setError('Authentication failed! Please try again');
        sessionContext.updateSession(false);
        setSubmitting(false);
      }
    }
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            type="text"
            placeholder="username"
            required
            autoComplete="username"
            value={username}
            onChange={(e: React.FormEvent<HTMLInputElement>): void => setUsername(e.currentTarget.value)}
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
        <StyledFloatButton type="submit" disabled={loading === 'pending' || submitting}>
          Login
        </StyledFloatButton>
      </form>
    </FormContainer>
  );
};
