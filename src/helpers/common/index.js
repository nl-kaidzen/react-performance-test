/* eslint-disable import/prefer-default-export */
/**
 * Return new UUID string value
 */
export const getUUID = () => (Date.now() + Math.random() * (10 ** 8)).toString(36);
