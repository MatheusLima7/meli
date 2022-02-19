import React from 'react';
import { render } from '@testing-library/react';

import Radio from '..';

test('Render Radio Component', async () => {
  const { getByTestId } = render(
    <Radio
      label="Teste"
      onChange={() => jest.fn()}
      defaultChecked={false}
      id="1"
      value="true"
      name="teste"
      testid="radio-wrapper"
    />,
  );
  const element = await getByTestId('radio-wrapper');
  expect(element).toBeTruthy();
});
