import { render } from '@testing-library/react';
// eslint-disable-next-line import/no-unresolved
import { Simulate } from 'react-dom/test-utils';
import React, { useContext } from 'react';

import { TGlobalNotificationContext, GlobalNotificationContext } from '../../hooks/useGlobalNotification';
import ServicesProvider, { ServicesContext } from '..';
import assetService from '../asset';

jest.mock('../asset');

const mockGlobalNotificationValue: TGlobalNotificationContext = {
  notifications: [],
  close: jest.fn(),
  add: jest.fn(),
};

const ReactTestComponent = () => {
  const TestComponent = () => {
    const services = useContext(ServicesContext);
    return (
      <div data-testid="react-test-component">
        <button
          data-testid="react-test-button"
          type="button"
          onClick={() => {
            services.getPU('PETR25', 1);
          }}
        >
          CLOSE
        </button>
      </div>
    );
  };
  return (
    <GlobalNotificationContext.Provider value={mockGlobalNotificationValue}>
      <ServicesProvider>
        <TestComponent />
      </ServicesProvider>
    </GlobalNotificationContext.Provider>
  );
};

const mockReturnAssetService = { getPU: jest.fn() };

describe('useGlobalNotification', async () => {
  beforeEach(() => {
    assetService.mockReturnValue(mockReturnAssetService);
  });

  const makeComponentStub = () => (
    render(<ReactTestComponent />)
  );

  it('should render children correctly', () => {
    const { getByTestId } = makeComponentStub();
    const testComponent = getByTestId('react-test-component');
    expect(testComponent).toBeDefined();
  });
  it('should provide the methods as expected', () => {
    const { getByTestId } = makeComponentStub();
    const testComponent = getByTestId('react-test-button');
    expect(testComponent).toBeDefined();
    Simulate.click(testComponent);
    expect(mockReturnAssetService.getPU).toHaveBeenCalledTimes(1);
    expect(mockReturnAssetService.getPU).toHaveBeenCalledWith('PETR25', 1);
  });
});
