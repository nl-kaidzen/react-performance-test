import React from 'react';
import ErrorLabel from 'components/common/ErrorLabel';
import PropTypes from 'prop-types';
import styles from './style.module.scss';

/**
 * Return semantically-correct input with onBlur and onChange events
 * @param {string} value          - currentValue of input
 * @param {string} placeholder    - placeholder title
 * @param {string} name           - value for native name attribute.
 *                                  Used for validation, be careful with them
 * @param {string} errorMessage   - value of error for ErrorLabel.
 * @param {functin} handleChange  - callback for onChange event
 * @param {functin} handleBlur    - callback for onBlur event
 *
 */
const Input = ({
  value, placeholder, name, errorMessage, handleChange, handleBlur,
}) => (
  <>
    <input
      value={value}
      placeholder={placeholder}
      name={name}
      onChange={handleChange}
      onBlur={handleBlur}
      type="text"
      className={styles.formInput}
    />
    <ErrorLabel
      errorMessage={errorMessage}
    />
  </>
);

Input.propTypes = {
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  errorMessage: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
};

export default React.memo(Input);
