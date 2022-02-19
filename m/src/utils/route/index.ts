import storage from '../storage';

const isAuthenticate = () => {
  const { get } = storage('sessionStorage');
  const token = get('access_token');
  return !!token;
};

const utils = {
  isAuthenticate,
};

export default utils;
