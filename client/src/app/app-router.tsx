import React from 'react';
import { Route } from 'react-router-dom';

import { HomePage } from '../pages/home';

export const AppRouter = (): JSX.Element => {
  return (
    <switch>
      <Route exact key="/" path="/" component={HomePage} />
    </switch>
  );
};
