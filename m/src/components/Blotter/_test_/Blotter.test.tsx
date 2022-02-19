import React from 'react';
import { render } from '@testing-library/react';

import { AuthContext } from '../../../hooks/useAuthenticate';
import Blotter from '..';

jest.mock('../../MyBusiness', () => () => (
  <div data-testid="test-my-business" />
));
jest.mock('../../TabBar', () => () => <div data-testid="test-tab-bar" />);

const mockAuthProviderValue: any = {
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

describe('Blotter', () => {
  const defaultProps = {
    open: true,
    setVisibility: jest.fn(),
  };

  const renderComponent = (newProps = {}) => (
    render(
      <AuthContext.Provider value={mockAuthProviderValue}>
        <Blotter {...defaultProps} {...newProps} />
      </AuthContext.Provider>,
    )
  );

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Component must render correctly', () => {
    const { getByTestId } = renderComponent();
    const element = getByTestId('wrapper-blotter');
    expect(element).toBeTruthy();
  });
});
