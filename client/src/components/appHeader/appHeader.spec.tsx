import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';

import { AppHeader } from './appHeader';

describe('app header component', () => {
  it('renders the header', () => {
    const history = createMemoryHistory();
    const { queryByTestId } = render(
      <Router history={history}>
        <AppHeader />
      </Router>,
    );

    expect(queryByTestId('app-header')).toHaveTextContent('MERN');
  });

  it('renders a login link', () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={history}>
        <AppHeader />
      </Router>,
    );

    expect(getByText('Login')).toBeDefined();
  });
});
