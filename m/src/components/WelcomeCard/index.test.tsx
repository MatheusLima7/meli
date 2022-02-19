import React from 'react';
import { render } from '@testing-library/react';
import WelcomeCard from '.';

test('Show welcome text', () => {
  const { getByText } = render(<WelcomeCard />);
  const paragraphElement = getByText(/Bem vindo!/i);
  expect(paragraphElement).toBeInTheDocument();
});
