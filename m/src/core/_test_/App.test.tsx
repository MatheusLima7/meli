import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';

jest.mock('../../routes', () => () => (<div>routes</div>));

test('loads and displays greeting', async () => {
  const { getByTestId } = render(<App />);
  const element = await getByTestId('container');
  expect(element).toBeTruthy();
});
