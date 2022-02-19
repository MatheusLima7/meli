import React, { useState } from 'react';

const TIME_OUT = 5000;

export type TNotification = {
  type: 'error' | 'success' | 'warning';
  message?: string;
  title: string;
  id?: string;
}

export interface TGlobalNotificationContext {
  add: (newNotification: TNotification) => void;
  notifications: TNotification[];
  close: (id: string) => void;
}

export const GlobalNotificationContext = React
  .createContext<TGlobalNotificationContext>(undefined!);

const GlobalNotificationProvider = ({ children }: { children: React.ReactChild }) => {
  const [notifications, setNotifications] = useState<TNotification[]>([]);
  const [timeoutSubscriptions, setTimeoutSubscriptions] = useState<{
    subscription: any,
    id: string,
  }[]>([]);

  const addNotification = (newNotification: TNotification) => {
    if (newNotification) {
      const newState = notifications;
      const newSubscriptions = timeoutSubscriptions;
      const id = `${notifications.length}-${Date.now()}`;

      newSubscriptions.push({
        id,
        subscription: setTimeout(
          () => {
            closeNotification(id);
          },
          TIME_OUT,
        ),
      });
      newState.push({ ...newNotification, id });
      setNotifications([...newState]);
    }
  };

  const closeNotification: (id: string) => void = (id: string) => {
    removeTimeOutSubscription(id);
    setNotifications((state) => (
      state.filter((item) => item.id !== id)
    ));
  };

  const removeTimeOutSubscription: (id: string) => void = (id: string) => {
    setTimeoutSubscriptions((state) => {
      const newState: any = [];
      state.every((item) => {
        if (item.id === id) {
          clearTimeout(item.subscription);
          return false;
        }
        newState.push(item);
        return true;
      });
      return newState;
    });
  };

  const store = {
    close: closeNotification,
    add: addNotification,
    notifications,
  };

  return (
    <GlobalNotificationContext.Provider
      value={store}
    >
      {children}
    </GlobalNotificationContext.Provider>
  );
};

export default GlobalNotificationProvider;
