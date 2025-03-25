import { Cache } from '../cache.js';
import { getSurveysFromCache } from "../surveys/index.js";
import { surveyTemplatesToBlocks } from "../../utils/index.js"

export const cacheSurveyBlocks = async (surveyBlocks) => {
  await Cache.set('surveyBlocks', surveyBlocks);
  console.info('surveyBlocks saved in app cache.');
};

export const fetchAndSaveSurveyBlocks = async () => {
  try {
    const cache = await getSurveysFromCache();
    console.info(`Store surveys successfully retrieved.`);

    const surveyBlocks = surveyTemplatesToBlocks(cache);

    await cacheSurveyBlocks(surveyBlocks);

    return surveyBlocks;
  } catch (err) {
    console.error('failed with error:', err);
  }
}

export const getSlackSurveysFromCache = async () => {
  const surveyBlocks = await Cache.get('surveyBlocks');

  if (surveyBlocks) {
    console.info(`Found ${surveyBlocks.data} survey blocks. Returning survey blocks from the cache.`);
    return surveyBlocks;
  }

  console.info('No surveys found. Fetching survey blocks.');
  return await fetchAndSaveSurveyBlocks();
};
