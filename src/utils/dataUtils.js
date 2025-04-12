import { formatDate } from './dateUtils';

/**
 * Processes sample data and adds required formatting
 */
export function processSampleData(samples, limit) {
  return samples.slice(0, limit).map((vouch, index) => ({
    ...vouch,
    formattedDate: formatDate(vouch.date),
    _uniqueId: `sample-${index}-${Math.floor(Math.random() * 1000000)}`
  }));
}
