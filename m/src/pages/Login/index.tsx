import React, {
  useCallback, useEffect, useState,
} from 'react';

import axios from 'axios';
import { useHistory } from 'react-router-dom';
import constants from '../../config/constants';
import LoadingPage from '../../components/LoadingPage';
import { Container } from './styles';
import storage from '../../utils/storage';
import utilURLString from '../../utils/parameters';
import utilHeaders from '../../utils/headers';
import utilGoogleAnalitycs from '../../utils/ga';

const {
  API,
  domain,
  clientId,
} = constants;

const LoginPage = () => {
  const [error, setError] = useState<boolean>(false);
  const [messageError, setMessageError] = useState<string>('');
  const queryString = window.location.search;
  const history = useHistory();
  const { get: getSessionStorage } = storage(
    'sessionStorage',
  );

  const handlerError = (err: any) => {
    setError(true);
    if (err?.response?.status === 401) {
      setMessageError('Seu usuário não foi encontrado. Estamos te redirecionando...');
    } else {
      setMessageError('Ocorreu um erro ao checar suas informações...');
    }
    setTimeout(() => history.push('/logout'), 5000);
  };

  const createAccessCode = (token: string) => {
    const config: any = utilHeaders.getHeadersFromCreateAccessCode(token);
    axios(
      `${API}/api/auth/CreateAccessCode`,
      config,
    )
      .then((response) => {
        const { data: newCode } = response.data;
        history.push(`/authenticate?code=${newCode}`);
      }).catch((err) => {
        handlerError(err);
      });
  };

  const code = utilURLString.findCode(queryString);

  const getToken = async () => {
    const config: any = utilHeaders.getHeadersFromToken(code);
    return axios(
      `https://${domain}/oauth/token`,
      config,
    ).then((res: any) => {
      const token = res.data.id_token;
      sessionStorage.setItem('auth0-token', token);
      redirectUser(token);
    });
  };

  const redirectUser = (token: string) => {
    if (!error) {
      window.history.replaceState({}, document.title, window.location.pathname);
      createAccessCode(token);
    }
  };

  const requestUserInfo = async () => {
    try {
      await getToken();
    } catch (err) {
      setError(true);
      setMessageError('Ocorreu um erro ao autenticar...');
      setTimeout(() => history.push('/logout'), 5000);
    }
  };

  const init = useCallback(() => {
    const token = getSessionStorage('auth0-token');
    const { pathname, origin } = window.location;

    if (!token) {
      if (!code) {
        const url = `https://${domain}/authorize?response_type=code&client_id=${clientId}&redirect_uri=${`${origin + pathname}`}&scope=openid%20profile%20email%20offline_access%20access_token&state=jn1X1G1n`;
        window.location.href = url;
      } else {
        requestUserInfo();
      }
    } else {
      redirectUser(token);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  useEffect(() => {
    init();
    utilGoogleAnalitycs.setGA('page', 'login', null);
    return () => {
      setError(false);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      {error && <LoadingPage loading message={messageError} />}
    </Container>
  );
};

export default LoginPage;
