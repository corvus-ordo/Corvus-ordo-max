const cache = new Map();

export function setCache(key, data, ttl = 60) {
  cache.set(key, {
    data,
    expires: Date.now() + ttl * 1000
  });
}

export function getCache(key) {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expires) {
    cache.delete(key);
    return null;
  }
  return entry.data;
}
