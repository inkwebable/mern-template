import { render } from '@testing-library/react';
import React from 'react';

import App from './App';

test('renders the title', () => {
  const { getByText } = render(<App />);
  const element = getByText('MERN');
  expect(element).toBeInTheDocument();
});
