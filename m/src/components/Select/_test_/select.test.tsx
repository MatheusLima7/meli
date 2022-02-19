import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Select, { TSelect } from '..';

jest.mock('../../../hooks/useOutside', () => () => ({ listen: jest.fn() }));

const propsFavoriteProps: TSelect = {
  options: [
    {
      label: 'label0',
      value: 0,
    },
    {
      label: 'label1',
      value: 1,
    },
  ],
  defaultValue: 0,
};

const makeComponentStub = (initialState: any, props: TSelect) => (
  render(<Select {...props} />)
);

describe('Select Component', () => {
  describe('Render', () => {
    it('should render Select', () => {
      expect(makeComponentStub(null, propsFavoriteProps)).toBeDefined();
    });
    it('must invoke function with change event', () => {
      const { getByTestId } = makeComponentStub(null, propsFavoriteProps);
      const selectComponent = getByTestId('selected-item');

      expect(selectComponent).toBeDefined();
      fireEvent.click(selectComponent);
    });
  });
});
