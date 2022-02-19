import { render } from '@testing-library/react';
// eslint-disable-next-line import/no-unresolved
import React from 'react';
import FormActions, { TFormActions } from '..';

const DEFAULT_PROPS: TFormActions = {
  ticker: 'PETR25',
  maxQuantity: 100,
  maxVolume: 1000,
  button: {
    action: jest.fn(),
    loading: false,
    color: 'red',
    title: 'title',
  },
  testid: 'test-id',
  rate: 10,
};

const makeComponentStub = (newProps: TFormActions = DEFAULT_PROPS) => (
  render(<FormActions {...newProps} />)
);

describe('FormActions', () => {
  test('Component must render correctly', async () => {
    const { getByTestId } = makeComponentStub();
    let element = getByTestId('test-id-financial');
    expect(element).toBeTruthy();

    element = getByTestId('test-id-quantity');
    expect(element).toBeTruthy();
  });
});
