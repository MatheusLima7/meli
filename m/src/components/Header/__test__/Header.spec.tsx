import React, { render } from '@testing-library/react';
// eslint-disable-next-line import/no-unresolved
import { Simulate } from 'react-dom/test-utils';
import { AuthContext, TAuthenticate } from '../../../hooks/useAuthenticate';
import storage from '../../../utils/storage';
import { ACCESS_TYPES } from '../../../utils/access';
import Header from '..';

jest.mock('../../../utils/storage');

const mockUser = {
  name: 'Trader0',
  id: 1000,
  firm: {
    name: 'EMPRESA0 COM NOME LONGO PARA TESTES',
    shortName: '',
    id: 1000,
  },
  features: [1],
};

const mockAuthenticateValue: TAuthenticate = {
  token: 'token 123',
  setToken: jest.fn(),
  setUser: jest.fn(),
  user: mockUser,
};

describe('Onboarding', () => {
  const renderComponent = (value = mockAuthenticateValue) => (
    render(
      <AuthContext.Provider value={value}>
        <Header />
      </AuthContext.Provider>,
    )
  );

  beforeEach(() => {
    storage.mockImplementation(() => ({
      get: jest.fn(() => 'true'),
      set: jest.fn(),
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Component must render correctly', () => {
    const { getByTestId } = renderComponent();
    const element = getByTestId('header-component-wrapper');
    expect(element).toBeTruthy();
  });

  it('Component must render correctly for first access', () => {
    storage.mockImplementation(() => ({
      get: jest.fn(() => 'false'),
      set: jest.fn(),
    }));
    const { queryByTestId } = renderComponent();
    expect(queryByTestId('onboarding-modal-wrapper')).toBeNull();
  });

  it('Component must render correctly for access broker', () => {
    const { queryByTestId } = renderComponent({
      ...mockAuthenticateValue,
      user: {
        ...mockUser,
        features: [ACCESS_TYPES.BROKER.value],
      },
    });
    expect(queryByTestId('onboarding-modal-wrapper')).toBeNull();
  });

  it('Update first access context when closing the modal', () => {
    const mockSetMemory = jest.fn();
    storage.mockImplementation(() => ({
      get: jest.fn(() => 'true'),
      set: mockSetMemory,
    }));

    const { getByTestId } = renderComponent();
    const element = getByTestId('close-button');

    expect(mockSetMemory).toHaveBeenCalledTimes(0);
    Simulate.click(element);
    expect(mockSetMemory).toHaveBeenCalledTimes(1);
    expect(mockSetMemory).toHaveBeenCalledWith('first_access', false);
  });
});
