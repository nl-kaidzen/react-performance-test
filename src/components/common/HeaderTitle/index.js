import React from 'react';
import PropTypes from 'prop-types';
import styles from './style.module.scss';

/**
 * Return <h1> with title. Used on each route.
 * @param {string} title - text for header
 */

const HeaderTitle = ({ title }) => (
  <h1 className={styles.title}>{title}</h1>
);

HeaderTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

export default React.memo(HeaderTitle);
