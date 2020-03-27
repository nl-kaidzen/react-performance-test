import React from 'react';
import PropTypes from 'prop-types';
import ErrorLabel from 'components/common/ErrorLabel';
import styles from './style.module.scss';

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
