import { render } from '@testing-library/react';
import route from 'react-router-dom';
import React from 'react';
import PrivateRoute from '..';

jest.mock('react-router-dom', () => ({
  Route: ({ component }) => <div>{component()}</div>,
  useHistory: jest.fn(),
}));

describe('PrivateRoute', () => {
  const defaultProps = {
    component: () => <div data-testid="test-component" />,
  };

  const renderComponent = (newProps = {}) => (
    render(<PrivateRoute {...defaultProps} {...newProps} />)
  );

  beforeEach(() => {
    route.useHistory.mockImplementation(() => ({
      push: jest.fn(),
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Component must render correctly', () => {
    const { getByTestId } = renderComponent();
    const element = getByTestId('test-component');
    expect(element).toBeTruthy();
  });
});
