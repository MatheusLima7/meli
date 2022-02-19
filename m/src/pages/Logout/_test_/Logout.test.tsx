import { render } from '@testing-library/react';
import React from 'react';
import Logout from '..';

jest.mock('react-router-dom', () => ({
  Route: ({ component }: { component: any }) => <div>{component()}</div>,
  useHistory: jest.fn(),
}));

jest.mock('react-router', () => ({
  withRouter: (Component: any) => () => (
    <div data-testid="test-component">
      <Component />
    </div>
  ),
}));

describe('Logout', () => {
  const renderComponent = (newProps = {}) => render(<Logout {...newProps} />);

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Component must render correctly', () => {
    const { getByTestId } = renderComponent();
    const element = getByTestId('test-component');
    expect(element).toBeTruthy();
  });
});
