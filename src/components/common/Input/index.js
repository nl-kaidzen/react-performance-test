import React from 'react';
import ErrorLabel from 'components/common/ErrorLabel'
import PropTypes from 'prop-types';
import styles from './style.module.scss';

const Input = ({ value, placeholder, name, errorMessage, handleChange, handleBlur }) => {
  return (
    <>
      <input 
        value={value}
        placeholder={placeholder}
        name={name}
        onChange={handleChange}
        onBlur={handleBlur}
        type="text"
        className={styles.formInput}/>
      <ErrorLabel 
        errorMessage={errorMessage}
      />
    </>
  );
}

Input.propTypes = {
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  errorMessage: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func
}

export default React.memo(Input);
