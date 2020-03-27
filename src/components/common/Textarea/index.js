import React from 'react';
import PropTypes from 'prop-types';
import ErrorLabel from 'components/common/ErrorLabel';
import styles from './style.module.scss';

/**
 * Return semantically-correct <textarea> with onBlur and onChange events
 * @param {string} value          - currentValue of textarea
 * @param {string} placeholder    - placeholder title
 * @param {string} name           - value for native name attribute.
 *                                  Used for validation, be careful with them
 * @param {string} errorMessage   - value of error for ErrorLabel.
 * @param {functin} handleChange  - callback for onChange event
 * @param {functin} handleBlur    - callback for onBlur event
 *
 */
const Textarea = ({
  value, placeholder, name, errorMessage, handleChange, handleBlur,
}) => (
  <>
    <textarea
      value={value}
      placeholder={placeholder}
      name={name}
      onChange={handleChange}
      onBlur={handleBlur}
      className={styles.formTextarea}
      cols="30"
      rows="10"
    />
    <ErrorLabel
      errorMessage={errorMessage}
    />
  </>
);

Textarea.propTypes = {
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  errorMessage: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
};

export default React.memo(Textarea);
