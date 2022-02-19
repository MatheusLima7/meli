/* istanbul ignore file */

import axios from 'axios';

import constants from '../config/constants';
import storage from '../utils/storage';

const controller = new AbortController();
const { SUBSCRIPTION_KEY, API } = constants;

const DEFAULT_HEADER = {
  'Ocp-Apim-Subscription-Key': SUBSCRIPTION_KEY,
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

const client = axios.create({ baseURL: API });

const buildHeader = () => {
  const { get: getSessionStorage } = storage(
    'sessionStorage',
  );

  const token = getSessionStorage('access_token');
  return {
    ...DEFAULT_HEADER,
    Authorization: token && `Bearer ${token}`,
  };
};

export const requestWithoutBody = async ({ url }: { url: string }) => {
  const config = {
    headers: buildHeader(),
    signal: controller.signal,
  };

  return client.get(url, config)
    .then((response) => (
      response.data
    ))
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.error(error);
      return {
        code: error?.data?.validationErrors || error?.validationErrors,
        error,
      };
    });
};

export const requestWithBody = async ({ url, params }: { url: string, params: any }) => {
  const config = {
    headers: buildHeader(),
  };

  return client.post(url, params, config)
    .then((response) => (
      response.data
    ))
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.error(error);
      return {
        code: error?.data?.validationErrors || error?.validationErrors,
        error,
      };
    });
};

export default {
  delete: requestWithoutBody,
  get: requestWithoutBody,
  patch: requestWithBody,
  post: requestWithBody,
  put: requestWithBody,
};
