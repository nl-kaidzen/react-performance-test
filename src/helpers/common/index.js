/**
 * Generate new UUID
 * @returns {string} - Unique ID
 */
export const getUUID = () => (Date.now() + Math.random() * (10 ** 8)).toString(36);
