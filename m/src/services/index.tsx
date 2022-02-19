import React, { useContext } from 'react';

import { GlobalNotificationContext } from '../hooks/useGlobalNotification';
import assetService from './asset';

export interface TServicesContext {
  getPU: (ticker: string, fee: number) => Promise<number | undefined>;
}

export const ServicesContext = React
  .createContext<TServicesContext>(undefined!);

const ServicesProvider = ({ children }: { children: React.ReactChild }) => {
  const notificationContext = useContext(GlobalNotificationContext);

  return (
    <ServicesContext.Provider
      value={{
        getPU: assetService(notificationContext).getPU,
      }}
    >
      {children}
    </ServicesContext.Provider>
  );
};

export default ServicesProvider;
