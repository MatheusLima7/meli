import { render } from '@testing-library/react';
import React, { useContext } from 'react';

import GlobalNotificationProvider, { GlobalNotificationContext } from '..';

const listIdNotifications = [];

const ReactTestComponent = () => {
  const TestComponent = () => {
    const notificationContext = useContext(GlobalNotificationContext);
    return (
      <div data-testid="react-test-component">
        <button
          type="button"
          onClick={() => {
            const id = notificationContext.add({
              title: 'Ops! Parece que algo deu errado',
              type: 'error',
            });
            listIdNotifications.push(id);
          }}
        >
          ADD
        </button>
        <button
          type="button"
          onClick={({ target: { value } }: any) => {
            notificationContext.close(value);
          }}
        >
          CLOSE
        </button>
      </div>
    );
  };
  return (
    <GlobalNotificationProvider>
      <TestComponent />
    </GlobalNotificationProvider>
  );
};

describe('useGlobalNotification', async () => {
  const makeComponentStub = () => (
    render(<ReactTestComponent />)
  );

  it('should render children correctly', () => {
    const { getByTestId } = makeComponentStub();
    const testComponent = getByTestId('react-test-component');
    expect(testComponent).toBeDefined();
  });
});
