import axios, { AxiosResponse } from 'axios';
import React, { FunctionComponent, useState } from 'react';

export const LoginForm: FunctionComponent = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) /*: Promise<void> */ => {
    event.preventDefault();
    setIsSubmitting(true);

    axios
      .post('http://localhost:5001/api/login', { email, password }, { withCredentials: true })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username: </label>
        <input type="text" required value={email} onChange={(e: React.FormEvent<HTMLInputElement>) => setEmail(e.currentTarget.value)} />
      </div>
      <div>
        <label>Password: </label>
        <input
          type="password"
          required
          value={password}
          onChange={(e: React.FormEvent<HTMLInputElement>) => setPassword(e.currentTarget.value)}
        />
      </div>
      <button type="submit" disabled={isSubmitting}>
        Login
      </button>
    </form>
  );
};
