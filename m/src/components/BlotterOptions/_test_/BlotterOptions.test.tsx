import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import BlotterOptions, { TBlotterOptions } from '..';

jest.mock('../../Search', () => () => (
  <div data-testid="test-id-search">Search</div>
));

const propsButtonComponent: TBlotterOptions = {
  setSearch: jest.fn(),
  setVisibility: jest.fn(),
};

const makeComponentStub = (
  initialState: any,
  props: TBlotterOptions = propsButtonComponent,
) => (
  render(<BlotterOptions {...props}>Teste</BlotterOptions>)
);

describe('BlotterOptions Component', () => {
  describe('Render', () => {
    it('should render button', () => {
      expect(makeComponentStub(null, propsButtonComponent)).toBeDefined();
    });

    it('should render Wrapper', () => {
      const { getByTestId } = makeComponentStub(null, propsButtonComponent);
      expect(getByTestId('blotter-options-wrapper')).toBeDefined();
    });

    it('should render icon-action and invoke functions with click event', () => {
      const { getByTestId } = makeComponentStub(null, propsButtonComponent);
      const buttonComponent = getByTestId('blotter-options-icon-action');
      expect(buttonComponent).toBeDefined();

      expect(propsButtonComponent.setVisibility).toBeCalledTimes(0);

      fireEvent.click(buttonComponent);

      expect(propsButtonComponent.setVisibility).toBeCalledTimes(1);
    });
  });
});
