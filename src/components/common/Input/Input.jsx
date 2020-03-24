import React from 'react';
import PropTypes from 'prop-types';
import styles from './Input.module.scss'

const Input = (props) => {
  return (
    <>
      <input 
        type="text"
        name={props.name}
        value={props.value}
        placeholder={props.placeholder}
        onChange={props.handleChange}
        className={styles.formInput}/>
      <p
        className={styles.formError}
      >{!props.isValid ? props.errorMessage : ''}</p>
    </>
  );
}

Input.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  isValid: PropTypes.bool,
  name: PropTypes.string,
  errorMessage: PropTypes.string,
  handleChange: PropTypes.func,
}

export default React.memo(Input);
