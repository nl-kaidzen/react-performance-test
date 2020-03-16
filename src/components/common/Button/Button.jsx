import React from 'react';
import styles from './Button.module.scss';
import PropTypes from 'prop-types';

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

Button.propTypes ={ 
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['default', 'delete']),
  title: PropTypes.string,
}
