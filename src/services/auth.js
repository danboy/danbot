import { Cache } from './cache.js';
import axios from 'axios';
export const fetchAuthToken = async () => {
  console.log(process.env.LEAPBOT_AUTH0_CLIENT_ID);
  try {
    const result = await axios.post(
      `https://${process.env.AUTH0_DOMAIN}/oauth/token`,
      {
        client_id: process.env.LEAPBOT_AUTH0_CLIENT_ID,
        client_secret: process.env.LEAPBOT_AUTH0_CLIENT_SECRET,
        audience: process.env.AUTH0_AUDIENCE || process.env.API_URL,
        grant_type: 'client_credentials',
      },
      {
        headers: { 'content-type': 'application/json' },
        retry: 2,
        retryDelay: 1000,
      }
    );

    return result.data;
  } catch (error) {
    console.error('fetchAuthToken error:', error);
    throw error;
  }
};

export const fetchAndSaveAuthToken = async () => {
  try {
    const tokenData = await fetchAuthToken();
    console.log('fetchAndSaveAuthToken Auth Token is successfully fetched.');

    tokenData.issuedAt = new Date().getTime();

    // To be safe, set the expiry timestamp to be 2 hours less than actual expiry time
    tokenData.expiresAt = new Date(tokenData.issuedAt + (22 * 60 * 60 * 1000)).getTime();

    await cacheAuthToken({ tokenData });


    return tokenData;
  } catch (err) {
    console.error('fetchAndSaveAuthToken failed with error:', err);
  }
};

export const cacheAuthToken = async ({ tokenData }) => {
  await Cache.set('authTokenData', tokenData);
  console.log('saveAuthTokenToCache tokenData saved in app cache.');
};

export const getAuthTokenFromCache = async () => {
  const tokenData = Cache.get('authTokenData');

  if (tokenIsStillActive(tokenData)) {
    console.log('Auth Token Is Still Active. Returning the token from the cache.');
    return tokenData;
  }

  console.log('Auth Token has expired. Fetching new token.');
  return await fetchAndSaveAuthToken();
};

const tokenIsStillActive = (tokenData) => {
  try {
    return (
      tokenData &&
      tokenData.access_token &&
      tokenData.expiresAt &&
      tokenData.expiresAt > moment.now()
    );
  } catch {
    return false;
  }
};
