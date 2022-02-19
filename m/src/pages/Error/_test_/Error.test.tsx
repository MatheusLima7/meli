import React, { render } from '@testing-library/react';
import Error from '..';

describe('Error', () => {
  const renderComponent = (newProps = {}) => render(<Error {...newProps} />);

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Component must render correctly', () => {
    const { getByTestId } = renderComponent();
    const element = getByTestId('error-message');
    expect(element).toBeTruthy();
  });
});
