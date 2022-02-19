import React from 'react';
import { render } from '@testing-library/react';

import { ISocketProviderProps } from '../../../typing/socket';
import { AuthContext } from '../../useAuthenticate';
import SocketProvider from '../provider';
import useSocket from '..';

jest.mock('..');
jest.mock('../context');
jest.mock('../../../hooks/useOutside', () => () => ({ listen: jest.fn() }));

const propsFavoriteProps: ISocketProviderProps = {
  children: () => (
    <div data-testid="children-component">
      Olá Mundo
    </div>
  ),
};

const mockProviderValue: any = {
  setToken: jest.fn(),
  setUser: jest.fn(),
  token: '123',
  user: {
    firm: undefined,
    features: [1],
    name: 'name',
    id: 1,
  },
};

const makeComponentStub = (initialState: any, props: ISocketProviderProps) => (
  render(
    <AuthContext.Provider value={mockProviderValue}>
      <SocketProvider {...props} />
    </AuthContext.Provider>,
  )
);

describe('SocketProvider Component', () => {
  beforeEach(() => {
    useSocket.mockImplementation(() => ({ connected: true }));
  });
  describe('Render', () => {
    it('should render SocketProvider', () => {
      expect(makeComponentStub(null, propsFavoriteProps)).toBeDefined();
    });
    it.skip('should render SocketProvider with loading state', () => {
      useSocket.mockImplementation(() => ({ connected: false }));
      const { getByTestId } = makeComponentStub(null, propsFavoriteProps);
      const element = getByTestId('loading-page');
      expect(element).toBeTruthy();
    });
    it('should render SocketProvider without loading state', () => {
      const { queryByTestId } = makeComponentStub(null, propsFavoriteProps);
      expect(queryByTestId('loading-page')).toBeFalsy();
    });
  });
});
