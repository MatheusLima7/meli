import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ResizeColumns, { IResizeColumns } from '..';

jest.mock('../../../hooks/useOutside', () => () => ({ listen: jest.fn() }));

const defaultProps: IResizeColumns = {
  handlerChange: jest.fn(),
  defaultWidth: 100,
  minWidth: 0,
};

const makeComponentStub = (initialState: any, props: IResizeColumns) => (
  render(<ResizeColumns {...props} />)
);

describe('Select Component', () => {
  describe('Render', () => {
    it('should render Select', () => {
      expect(makeComponentStub(null, defaultProps)).toBeDefined();
    });
    it.skip('must invoke behaviors with drag', () => {
      const { getByTestId } = makeComponentStub(null, defaultProps);
      const element = getByTestId('vertical-bar');
      expect(defaultProps.handlerChange).toBeCalledTimes(0);
      fireEvent.dragStart(element);
      fireEvent.drag(element);
      fireEvent.dragEnd(element);
      expect(defaultProps.handlerChange).toBeCalledTimes(1);
    });
  });
});
