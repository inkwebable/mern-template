import { render } from '@testing-library/react';
import React from 'react';

import App from './App';

test('renders login link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Login/i);
  expect(linkElement).toBeInTheDocument();
});
