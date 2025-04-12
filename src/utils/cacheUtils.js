/**
 * Retrieves cached vouches if they're still valid
 */
export function getFromCache() {
  const cachedVouches = sessionStorage.getItem('cachedVouches');
  const cacheTimestamp = sessionStorage.getItem('vouchesCacheTimestamp');
  const cacheAge = cacheTimestamp ? Date.now() - parseInt(cacheTimestamp) : Infinity;
  
  if (cachedVouches && cacheAge < 5 * 60 * 1000) {
    try {
      const parsedVouches = JSON.parse(cachedVouches);
      if (Array.isArray(parsedVouches) && parsedVouches.length > 0) {
        return parsedVouches;
      }
    } catch (e) {
      console.error("Error parsing cached vouches:", e);
    }
  }
  return null;
}

/**
 * Saves vouches to cache with timestamp
 */
export function saveToCache(vouches) {
  sessionStorage.setItem('cachedVouches', JSON.stringify(vouches));
  sessionStorage.setItem('vouchesCacheTimestamp', Date.now().toString());
}
