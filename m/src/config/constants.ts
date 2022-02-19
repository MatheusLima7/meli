/* istanbul ignore file */

export default {
  API: process.env.ENV_API,
  SUBSCRIPTION_KEY: process.env.ENV_SUBSCRIPTION_KEY,
  SIGNALR_URI: process.env.ENV_SIGNALR_URI,
  REFRESH_TOKEN_INTERVAL: process.env.ENV_REFRESH_TOKEN_INTERVAL,
  ENV_INSTITUCIONAL: process.env.ENV_INSTITUCIONAL,
  USER: process.env.USER,
  PASSWORD: process.env.PASSWORD,
  domain: process.env.AUTH0_DOMAIN,
  clientId: process.env.AUTH0_CLIENTID,
  audience: process.env.AUTH0_AUDIENCE,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
};
