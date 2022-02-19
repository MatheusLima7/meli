import React from 'react';
import { render } from '@testing-library/react';
// eslint-disable-next-line import/no-unresolved
import { Simulate } from 'react-dom/test-utils';
import useDebounce from '../../../hooks/useDebounce';
import Search, { TSearch } from '..';

jest.mock('../../Input', () => (props: any) => <input {...props} />);
jest.mock('../../../hooks/useOutside', () => () => ({ listen: jest.fn() }));

const propsFavoriteProps: TSearch = {
  setFilter: jest.fn(),
};

const makeComponentStub = (initialState: any, props: TSearch) => (
  render(<Search {...props} />)
);

describe('Search Component', () => {
  const useDispatchMock = jest.spyOn(useDebounce, 'dispatch');
  const mockDispatch: any = jest.fn();

  beforeEach(() => {
    useDispatchMock.mockReturnValue(mockDispatch);
  });

  describe('Render', () => {
    it('should render Search', () => {
      expect(makeComponentStub(null, propsFavoriteProps)).toBeDefined();
    });
    it('must invoke function with change event', () => {
      const { getByTestId } = makeComponentStub(null, propsFavoriteProps);
      const inputComponent = getByTestId('search-input');

      expect(inputComponent).toBeDefined();
      expect(useDispatchMock).toBeCalledTimes(0);

      Simulate.change(inputComponent, { target: { value: 'value' } });

      expect(useDispatchMock).toBeCalledTimes(1);
    });
  });
});
