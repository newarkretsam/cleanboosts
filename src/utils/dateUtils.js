/**
 * Formats a date string to a more readable format
 */
export function formatDate(dateString) {
  try {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  } catch (e) {
    return dateString;
  }
}
