import axios from "axios";
import { getAuthTokenFromCache } from "../services/auth.js";

/*
 * getOpenStores()
 *
 * Returns an object with
 *
 * data: and array of soteLite objects
 *
 * pagination: an object wth our typical pagination info
 *
 */

export const getOpenStores = async () => {

  const { access_token } = await getAuthTokenFromCache();
  if (!access_token) return "access token not found";
  try {
    const response = await axios.get(`${process.env.API_URL}/admin/stores?version=4&limit=9999&stages=STORE_CLOSURE&stages=LIVE`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`,
      },
      retry: 3,
      retryDelay: 1000,
    });
    return response.data;
  } catch (error) {
    console.error('fetchStoreDetails FAILED. Error:', error.message);
    return error;
  }
};
