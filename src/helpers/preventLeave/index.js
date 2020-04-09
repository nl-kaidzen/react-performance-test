/**
 * This function prevent tab from closing/reloading.
 * @param {object} event - native object from browser
 */
export const preventLeave = (event) => {
  event.preventDefault();
  // eslint-disable-next-line no-param-reassign
  event.returnValue = '';
};
