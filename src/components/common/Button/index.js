import React from 'react';
import PropTypes from 'prop-types';
import { BUTTON_TYPES_MAP } from 'constants/storage';
import styles from './style.module.scss';

const TYPE_TO_CLASSNAMES_MAP = {
  default: `${styles.formButton}`,
  delete: `${styles.formButton} ${styles['formButton--delete']}`,
};
/**
 * Return symantically-correct button with presetted class
 *
 * @param {string} type - type of button. Check BUTTON_TYPES_MAP for info.
 * @param {string} title - label for button.
 * @param {function} onClick -  callback for onClick-event.
 */

const Button = ({ type, children, onClick }) => {
  const buttonType = BUTTON_TYPES_MAP[type];
  return (
    <button
      onClick={onClick}
      className={TYPE_TO_CLASSNAMES_MAP[buttonType]}
      type="button"
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  type: PropTypes.oneOf([BUTTON_TYPES_MAP.default, BUTTON_TYPES_MAP.delete]).isRequired,
  children: PropTypes.string.isRequired,
};

export default React.memo(Button);
