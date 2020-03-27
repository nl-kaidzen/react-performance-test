import React from 'react';
import PropTypes from 'prop-types';
import styles from './style.module.scss';

/**
 * Return label with errorMessage
 * @param {string} errorMessage - error for <p>
 */
const ErrorLabel = ({ errorMessage }) => (
  <p
    className={styles.formError}
  >
    {errorMessage}
  </p>
);

ErrorLabel.propTypes = {
  errorMessage: PropTypes.string.isRequired,
};

export default React.memo(ErrorLabel);
