import React from 'react';
import { render } from '@testing-library/react';
import { Main } from '../Main';

jest.mock('../../routes', () => () => (<div>RouteConfig</div>));

test('Render Route Config', async () => {
  const { getByTestId } = render(<Main />);
  const element = await getByTestId('route-config');
  expect(element).toBeTruthy();
});
