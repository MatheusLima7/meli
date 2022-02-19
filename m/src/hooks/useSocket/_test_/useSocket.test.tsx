import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { useHistory } from 'react-router-dom';
import * as axios from 'axios';

import { AuthContext, TAuthenticate } from '../../useAuthenticate/index';
import useSocket from '..';

jest.mock('react-router-dom', () => ({ useHistory: jest.fn() }));
jest.mock('../../../utils/storage', () => () => ({
  set: jest.fn(),
  get: jest.fn(() => 'dado'),
}));

JSON.parse = jest.fn().mockImplementationOnce(() => {
  // return your what your code is returning.
});

jest.mock('@microsoft/signalr', () => ({
  HubConnectionBuilder: class {
    withUrl = () => ({
      withAutomaticReconnect: () => ({
        build: () => ({
          onclose: jest.fn(),
          onreconnected: jest.fn(),
          onreconnecting: jest.fn(),
          on: jest.fn(),
          start: () => (
            new Promise((_, reject) => { reject(new Error('Error test!')); })
          ),
          invoke: () => (
            new Promise((_, reject) => { reject(new Error('Error test!')); })
          ),
        }),
      }),
    });
  },
  HubConnectionState: {
    Connected: true,
  },
  HttpTransportType: {
    WebSockets: 1,
    LongPolling: 4,
  },
}));
jest.mock('axios');

const mockAuthenticateValue: TAuthenticate = {
  token: 'token 123',
  setToken: jest.fn(),
};

const wrapper = ({ children }) => (
  <AuthContext.Provider value={mockAuthenticateValue}>
    {children}
  </AuthContext.Provider>
);

describe('UseSocket', () => {
  const mockUseHistory: any = {
    push: jest.fn(),
  };

  beforeEach(() => {
    useHistory.mockReturnValue(mockUseHistory);

    axios.mockReturnValue({
      create: () => Promise.resolve({ data: { data: 'refresh_token' } }),
    });
  });

  describe('Custom methods and hooks', () => {
    it('The useSocket method provides the expected behavior, connection failure', async () => {
      const { result } = renderHook(() => useSocket(), { wrapper });
      expect(result.current.connection).toBeDefined();
      expect(result.current.connected).toBeFalsy();
    });
  });
});
