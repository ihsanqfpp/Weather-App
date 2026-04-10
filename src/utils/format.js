/**
 * Formats a Unix timestamp into a local time string (HH:MM AM/PM)
 * @param {number} timestamp - Unix timestamp in seconds
 * @param {number} timezone - Timezone offset in seconds
 * @returns {string}
 */
export const formatLocalTime = (timestamp, timezone) => {
  const date = new Date((timestamp + timezone) * 1000);
  return date.getUTCHours().toString().padStart(2, '0') + ":" + 
         date.getUTCMinutes().toString().padStart(2, '0');
};
