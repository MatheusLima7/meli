import constants from '../../config/constants';

const {
  SUBSCRIPTION_KEY,
  audience,
  clientSecret,
  clientId,
} = constants;

const DEFAULT_HEADER = {
  'Ocp-Apim-Subscription-Key': SUBSCRIPTION_KEY,
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

const getHeadersFromToken = (code: string | boolean) => {
  const { origin, pathname } = window.location;
  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    data: JSON.stringify({
      grant_type: 'authorization_code',
      client_id: clientId,
      client_secret: clientSecret,
      code,
      redirect_uri: origin + pathname,
      audience,
    }),
  };
};

const getHeadersToPrivateAccess = (token: string) => ({
  method: 'post',
  headers: {
    ...DEFAULT_HEADER,
    Authorization: `Bearer ${token}`,
  },
});

const getHeadersFromCreateAccessCode = (token: string) => ({
  method: 'post',
  headers: DEFAULT_HEADER,
  data: { token },
  withCredentials: true,
});

export default {
  getHeadersFromCreateAccessCode,
  getHeadersToPrivateAccess,
  getHeadersFromToken,
  DEFAULT_HEADER,
};
