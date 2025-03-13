import { Cache } from '../cache.js';
import { fetchStores } from "../api/index.js";

export const cacheStores = async (key='liveStores',stores) => {
  await Cache.set(key, stores);
  console.info(`${key} saved in app cache.`);
};

export const fetchAndSaveStores = async (key='liveStores') => {
  try {
    const stores = await fetchStores();
    console.info(`Store Surveys successfully fetched.`);

    await cacheStores(key, stores.data);

    return stores.data;
  } catch (err) {
    console.error('failed with error:', err);
  }
}

export const getStoresFromCache = async (key='liveStores', params) => {
  const stores = await Cache.get(key);

  if (stores) {
    console.info(`Found ${stores.data.length} store surveys. Returning store surveys from the cache.`);
    return stores;
  }

  console.info('No surveys found. Fetching store surveys.');
  return await fetchAndSaveStores(key);
};

