import React,
{
  useContext,
  useEffect,
  useState,
} from 'react';
import axios from 'axios';

import { GlobalNotificationContext } from '../useGlobalNotification';
import constants from '../../config/constants';
import utilHeaders from '../../utils/headers';
import storage from '../../utils/storage';

const { API } = constants;

export type TFirm = {
  shortName: string;
  name: string;
  id: number;
}

export type TUser = {
  features: Array<number>;
  name: string;
  firm: TFirm;
  id: number;
}

export type TAuthenticate = {
  getUserAccess: (token: string) => void;
  setToken: (token: string) => void;
  setUser: (user: TUser) => void;
  token: string;
  user?: TUser;
}

export const AuthContext = React
  .createContext<TAuthenticate>(undefined!);

const AuthProvider = ({ children }: { children: React.ReactChild }) => {
  const notificationContext = useContext(GlobalNotificationContext);
  const [token, setToken] = useState<string>('');
  const [user, setUser] = useState<TUser | undefined>();

  const { get: getSessionStorage } = storage('sessionStorage');

  const getUserAccess = async (sessionToken: string) => {
    if (sessionToken) {
      const config: any = utilHeaders.getHeadersToPrivateAccess(sessionToken);
      await axios(
        `${API}/api/auth/GetUserAccess`,
        config,
      )
        .then((response) => {
          setUser(response.data);
        }).catch((err) => {
          // eslint-disable-next-line no-console
          console.error(err);
          notificationContext.add({
            title: 'Ops! Parece que algo deu errado',
            type: 'error',
          });
        });
    }
  };

  useEffect(() => {
    const setParams = async () => {
      setToken(sessionToken);
      await getUserAccess(sessionToken);
    };

    const sessionToken = getSessionStorage('access_token');
    setParams();

    return () => {
      setToken('');
      setUser(undefined);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider
      value={{
        getUserAccess,
        setToken,
        setUser,
        token,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
