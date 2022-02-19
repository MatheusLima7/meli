import React from 'react';
import { render } from '@testing-library/react';
// eslint-disable-next-line import/no-unresolved
import { Simulate } from 'react-dom/test-utils';
import BoxMessage from '..';
import {
  TGlobalNotificationContext,
  GlobalNotificationContext,
} from '../../../hooks/useGlobalNotification';

const mockGlobalNotificationValue: TGlobalNotificationContext = {
  add: jest.fn(),
  notifications: [
    {
      type: 'error',
      title: 'title',
      id: 'message 1',
    },
  ],
  close: jest.fn(),
};

const makeComponentStub = () => (
  render(
    <GlobalNotificationContext.Provider value={mockGlobalNotificationValue}>
      <BoxMessage />
    </GlobalNotificationContext.Provider>,
  )
);

describe('BoxMessage Component', () => {
  describe('Render', () => {
    it('should render BoxMessage', () => {
      expect(makeComponentStub()).toBeDefined();
    });

    it('should render titleComponent', () => {
      const { getByTestId } = makeComponentStub();
      const titleComponent = getByTestId('title');
      expect(titleComponent).toBeDefined();
    });

    it('should render messageComponent', () => {
      const { getByTestId } = makeComponentStub();
      const messageComponent = getByTestId('message');
      expect(messageComponent).toBeDefined();
    });

    it('should close boxMessage on click', () => {
      const { getByTestId } = makeComponentStub();
      const closeIcon = getByTestId('close-icon');
      expect(mockGlobalNotificationValue.close).not.toBeCalled();
      Simulate.click(closeIcon);
      expect(mockGlobalNotificationValue.close)
        .toHaveBeenCalledWith(mockGlobalNotificationValue.notifications[0].id);
    });
  });
});
