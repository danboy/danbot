import { Cache } from '../cache.js';
import { fetchStoreSurveys } from "../api/index.js";

export const cacheStoreSurveys = async (storeSurveys) => {
  await Cache.set('storeSurveys', storeSurveys);
  console.info('storeSurveys saved in app cache.');
};

export const fetchAndSaveStoreSurveys = async () => {
  try {
    const storeSurveys = await fetchStoreSurveys();
    console.info(`Store Surveys successfully fetched.`);

    await cacheStoreSurveys(storeSurveys.data);

    return storeSurveys.data;
  } catch (err) {
    console.error('failed with error:', err);
  }
}

export const getSurveysFromCache = async () => {
  const storeSurveys = await Cache.get('storeSurveys');

  if (storeSurveys) {
    console.info(`Found ${storeSurveys.data} store surveys. Returning store surveys from the cache.`);
    return storeSurveys;
  }

  console.info('No surveys found. Fetching store surveys.');
  return await fetchAndSaveStoreSurveys();
};
