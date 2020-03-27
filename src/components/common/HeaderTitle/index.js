/* eslint-disable react/prop-types */
import React from 'react';
import styles from './style.module.scss';
import PropTypes from 'prop-types';

const HeaderTitle = ({ title }) => (
  <h1 className={styles.title}>{title}</h1>
);

HeaderTitle.propTypes = {
  title: PropTypes.string,
}

export default React.memo(HeaderTitle);
