import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button, { TButton } from '..';

const propsButtonComponent: TButton = {
  isEnabled: true,
  id: 'test',
  onClick: jest.fn(),
  children: 'test',
  testid: 'testid',
};

const makeComponentStub = (
  _: any,
  props: TButton = propsButtonComponent,
) => (
  render(<Button {...props}>Teste</Button>)
);

describe('Button Component', () => {
  describe('Render', () => {
    it('should render button', () => {
      expect(makeComponentStub(null, propsButtonComponent)).toBeDefined();
    });
    it('must invoke function onClick with click event', () => {
      const { getByTestId } = makeComponentStub(null, propsButtonComponent);
      const buttonComponent = getByTestId('testid');

      expect(propsButtonComponent.onClick).toBeCalledTimes(0);

      fireEvent.click(buttonComponent);

      expect(propsButtonComponent.onClick).toBeCalledTimes(1);
    });
    it('must invoke functions setNegociate and setNegociate with click event', () => {
      const { getByTestId } = makeComponentStub(null, {
        ...propsButtonComponent,
        onClick: undefined,
      });
      const buttonComponent = getByTestId('testid');

      fireEvent.click(buttonComponent);

      expect(propsButtonComponent.onClick).toBeCalledTimes(0);
    });
  });
});
