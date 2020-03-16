/* eslint-disable react/prop-types */
import React from 'react';
import styles from './Button.module.scss';

const TYPE_TO_CLASSNAMES_MAP = {
  default: `${styles.formButton}`,
  delete: `${styles.formButton} ${styles['formButton--delete']}`,
};

const Button = (props) => (
  <button
    onClick={props.onClick}
    className={TYPE_TO_CLASSNAMES_MAP[props.type]}
    type="button"
  >
    {props.title}
  </button>
);

export default Button;
