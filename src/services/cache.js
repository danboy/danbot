import cache from 'persistent-cache';

const PCache = cache({ duration: 1000 * 3600 * 12 });

export const Cache = {
  ...PCache,
  set: PCache.putSync,
  get: PCache.getSync,
}
