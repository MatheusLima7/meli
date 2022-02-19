import {
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { HubConnectionBuilder, HttpTransportType, HubConnectionState } from '@microsoft/signalr';
import axios, { AxiosRequestConfig } from 'axios';
import { useHistory } from 'react-router-dom';
import { ISocketState, TCommandData } from '../../typing/socket';
import constants from '../../config/constants';
import { AuthContext, TUser } from '../useAuthenticate';
import storage from '../../utils/storage';
import useInterval from '../useInterval';
import { SOCKET_CONNECTIONS_TYPES } from '../../utils/enum';
import configByProfile, { TConfigByProfile } from '../../mocks/config-by-profile';
import utilConfig from '../../utils/config';
import utilFilter from '../../utils/filters';

const {
  API,
  SIGNALR_URI,
  SUBSCRIPTION_KEY,
  REFRESH_TOKEN_INTERVAL,
} = constants;

const instance = axios.create({
  withCredentials: true,
  timeout: 5000,
});

const useSocket = (): ISocketState => {
  const { set: setSessionStorage, get: getSessionStorage } = storage(
    'sessionStorage',
  );

  const opt: AxiosRequestConfig = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Ocp-Apim-Subscription-Key': SUBSCRIPTION_KEY,
    },
  };

  const authContext = useContext(AuthContext);
  const history = useHistory();
  const usedToken = getSessionStorage('access_token') || authContext.token;
  const refreshTokenInterval = Number(REFRESH_TOKEN_INTERVAL);
  const [connection, setConnection] = useState<any>(null);
  const [connected, setConnected] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [config, setConfig] = useState<TConfigByProfile[]>([]);
  let customConfig: TConfigByProfile[] = configByProfile;
  const auth = getSessionStorage('authenticate');

  const { get: getLocalStorage } = storage('localStorage');
  const commandData: TCommandData = {};
  const filter = utilFilter.getFilter(true);
  const orderParams = JSON.parse(getLocalStorage('OrderParams'));

  if (filter || orderParams) {
    commandData.InitialFilterParams = filter;
    commandData.InitialOrderParams = orderParams;
  }

  function isTokenValid(token: string) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date()).getTime() / 1000)) < expiry;
  }

  const refreshToken = () => instance(`${API}/api/auth/RefreshToken?access_token=${getSessionStorage('access_token')}`, opt);
  const retryRefreshToken = () => (function recursiveTries(i) {
    setTimeout(() => {
      refreshToken()
        .then((response) => {
          const { data: token } = response.data;
          if (token) {
            setSessionStorage('access_token', token);
            authContext.setToken(token);
            clearTimeout();
          } else if (i < 10) recursiveTries(i + 1); else clearTimeout();
        }).catch(() => {
          if (i < 10) recursiveTries(i + 1); else clearTimeout();
        });
    }, (refreshTokenInterval * 20));
  }(0));

  useInterval(() => {
    if (connection && usedToken) {
      instance(`${API}/api/auth/RefreshToken?access_token=${getSessionStorage('access_token')}`, opt)
        .then((response: any) => {
          const { data: token } = response.data;
          if (token) {
            setSessionStorage('access_token', token);
            authContext.setToken(token);
          }
        })
        .catch((error: any) => {
          // eslint-disable-next-line no-console
          console.error(error);
          if (isTokenValid(getSessionStorage('access_token'))) {
            retryRefreshToken();
          } else {
            history.push('/logout');
          }
        });
    }
  }, 1000 * refreshTokenInterval);

  const handle = useCallback(
    (command, callback): void => {
      if (connected && connection) {
        connection
          .invoke('Handle', command)
          .then(() => {
            if (callback) callback();
          })
          .catch((err: any) => {
            // eslint-disable-next-line no-console
            console.error(err);
          })
          .finally();
      }
    },
    [connected, connection],
  );

  const checkMountedComponentByProfile = (user?: TUser) => {
    if (!config.length || !user || !user.features.length) return false;

    return user.features.every((feature) => (
      config.filter((conf) => conf.id === feature)
        .every((item) => item.isMounted)
    ));
  };

  const initializeSocket = () => {
    handle(
      { Type: SOCKET_CONNECTIONS_TYPES.ASSETS_RUN_RESULT, CommandData: commandData },
      null,
    );
  };

  useEffect(() => {
    const checked = checkMountedComponentByProfile(authContext?.user);
    if (connected && checked) {
      initializeSocket();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    connection, connected, config,
  ]);

  const startConnection = async () => {
    await connection
      .start()
      .then(() => {
        setConnection(connection);
        setConnected(connection.state === HubConnectionState.Connected);
      })
      .catch((error: any) => {
        // eslint-disable-next-line no-console
        console.error(error);
        history.push('/logout');
      });
  };

  useEffect(() => {
    if (connection) {
      connection.onclose(async () => {
        // eslint-disable-next-line no-console
        console.error('Error: close socket connection.');
        history.push('/logout');
      });
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      connection.onreconnected(() => {
        setConnected(true);
        setMessage('');
      });

      connection.onreconnecting(() => {
        setConnected(false);
        setMessage('Sem conexão com a internet, aguarde alguns minutos.');
      });

      startConnection();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connection, history]);

  useEffect(() => {
    const getConnection = async () => {
      const con = new HubConnectionBuilder()
        .withUrl(`${API}${SIGNALR_URI}?subscription-key=${SUBSCRIPTION_KEY}`, {
          accessTokenFactory: () => getSessionStorage('access_token') || authContext.token,
          skipNegotiation: false,
          transport:
            HttpTransportType.WebSockets || HttpTransportType.LongPolling,
        })
        .withAutomaticReconnect([0, 1000, 2000, 2000, 5000, 10000, 10000, 10000, 20000])
        .build();
      setConnection(con);
    };
    if (auth) {
      getConnection();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  const setConfigByComponent = (component: string) => {
    const nextConfig = utilConfig.setMountedComponent(
      customConfig, component,
    );
    customConfig = nextConfig;
    setConfig(nextConfig);
  };

  return {
    setConfigByComponent,
    connection,
    connected,
    message,
  };
};

export default useSocket;
