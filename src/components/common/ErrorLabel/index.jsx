import React from 'react';
import styles from './style.module.scss';
import PropTypes from 'prop-types'

const ErrorLabel = ({ errorMessage }) => {
  return(
    <p
      className={styles.formError}
    >
      {errorMessage}
    </p>
  );
}

ErrorLabel.propTypes = {
  errorMessage: PropTypes.string,
}

export default React.memo(ErrorLabel);
