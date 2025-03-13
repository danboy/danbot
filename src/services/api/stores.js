import axios from "axios";
import { getAuthTokenFromCache } from "../auth.js";

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

const toParam = (obj) => {
  const key = Object.keys(obj)[0];
  return `${key}=${obj[key]}`;
}

export const fetchStores = async (query=[{limit: 9999}, {stages: "STORE_CLOSURE"}, {stages: "LIVE"}]) => {
  const params = query.map(param => toParam(param)).join('&')
  const { access_token } = await getAuthTokenFromCache();
  if (!access_token) return "access token not found";
  try {
    console.log({params})
    const response = await axios.get(`${process.env.API_URL}/admin/stores?${params}`, {
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

