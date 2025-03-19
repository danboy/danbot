import axios from "axios";
import { formatDateISO } from "../../utils/date.js";
import { getAuthTokenFromCache } from "../auth.js";

/*
 * fetchStoreSurveys()
 *
 * Returns an object with
 *
 * data: and array of survey response objects
 *
 *
 */


export const fetchStoreSurveys = async function (date) {
  if(!date) date = formatDateISO(new Date());
  const { access_token } = await getAuthTokenFromCache();
  if (access_token) {
    try {
      return await axios.get(`${process.env.API_URL}/retail/surveys/leapbot/response?survey_date=${date}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${access_token}`,
        },
        retry: 3,
        retryDelay: 1000,
      });
    } catch (error) {
      console.error('fetchStoreSurveys FAILED. Error:', error.message);
      return [];
    }
  }

  throw new Error('no access token');
};

