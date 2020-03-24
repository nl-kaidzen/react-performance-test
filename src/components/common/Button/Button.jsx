import React from 'react';
import styles from './Button.module.scss';
import PropTypes from 'prop-types';
import { BUTTON_TYPES_MAP } from './../../../constants/storage';

const TYPE_TO_CLASSNAMES_MAP = {
  default: `${styles.formButton}`,
  delete: `${styles.formButton} ${styles['formButton--delete']}`,
};

const Button = (props) => {
  const buttonType = BUTTON_TYPES_MAP[props.type];
  return (
    <button
      onClick={props.onClick}
      className={TYPE_TO_CLASSNAMES_MAP[buttonType]}
      type="button"
    >
      {props.title}
    </button>
  )
};

Button.propTypes ={ 
  onClick: PropTypes.func.isRequired,
  type: PropTypes.oneOf([BUTTON_TYPES_MAP.default, BUTTON_TYPES_MAP.delete]).isRequired,
  title: PropTypes.string.isRequired,
}

export default React.memo(Button);
