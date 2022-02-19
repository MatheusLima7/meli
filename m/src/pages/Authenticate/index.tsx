import React, {
  ReactElement,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import axios, { AxiosRequestConfig } from 'axios';

import { AuthContext } from '../../hooks/useAuthenticate';
import LoadingPage from '../../components/LoadingPage';
import utilGoogleAnalitycs from '../../utils/ga';
import constants from '../../config/constants';
import storage from '../../utils/storage';
import { Wrapper } from './styles';

const instance = axios.create({
  withCredentials: true,
  timeout: 10000,
});

const { API, SUBSCRIPTION_KEY } = constants;

const Authenticate = (): ReactElement => {
  const history = useHistory();
  const searhcCodeName = 'code';
  const code = new URLSearchParams(useLocation().search).get(searhcCodeName);
  const { set: setSessionStorage } = storage('sessionStorage');
  const [message, setMessage] = useState<string>(
    'Aguarde, estamos te redirecionando...',
  );

  const authContext = useContext(AuthContext);

  useEffect(() => {
    if (!authContext.token && code) {
      const opt: AxiosRequestConfig = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Ocp-Apim-Subscription-Key': SUBSCRIPTION_KEY,
        },
        data: {
          accessCode: code,
        },
      };
      instance(`${API}/api/auth/Login`, opt)
        .then((response: any) => {
          const { data: accessToken } = response.data;
          setSessionStorage('access_token', accessToken);
          setSessionStorage('authenticate', true);
          authContext.setToken(accessToken);
          authContext.getUserAccess(accessToken);
          setTimeout(() => {
            history.push('/');
          }, 5000);
        })
        .catch((error: any) => {
          // eslint-disable-next-line no-console
          console.error(error);
          setMessage(
            'Seu usuário não foi encontrado. Estamos te redirecionando...',
          );
          setTimeout(() => {
            history.replace('/logout');
          }, 5000);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  useEffect(() => {
    utilGoogleAnalitycs.setGA('page', 'authenticate', null);
  }, []);

  return (
    <Wrapper>
      <LoadingPage hasImage loading message={message} />
    </Wrapper>
  );
};

export default Authenticate;
