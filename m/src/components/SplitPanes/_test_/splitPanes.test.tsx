import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SplitPanes, { ISplitPanes } from '..';

jest.mock('../../../hooks/useOutside', () => () => ({ listen: jest.fn() }));

const defaultProps: ISplitPanes = {
  children: <div>children</div>,
  setVisibility: jest.fn(),
  handlerChange: jest.fn(),
  defaultHeight: 200,
  maxHeight: 300,
  minHeight: 40,
  open: true,
};

const makeComponentStub = (initialState: any, props: ISplitPanes) => (
  render(<SplitPanes {...props} />)
);

describe('Select Component', () => {
  describe('Render', () => {
    it('should render Select', () => {
      expect(makeComponentStub(null, defaultProps)).toBeDefined();
    });
    it('should render Select', () => {
      const { getByTestId } = makeComponentStub(null, defaultProps);
      const element = getByTestId('horizontal-bar');
      fireEvent.dragStart(element);
      fireEvent.drag(element);
      expect(defaultProps.handlerChange).toBeCalledTimes(0);
      fireEvent.dragEnd(element);

      const elementContainer = getByTestId('split-panes-container');
      expect(elementContainer.getAttribute('style')).toContain('width: 100%');
      expect(elementContainer.getAttribute('style')).toContain('height: 200px');
    });
  });
});
