/* eslint-disable react/prop-types */
import React from 'react';
import styles from './HeaderTitle.module.scss';
import PropTypes from 'prop-types';

const HeaderTitle = (props) => (
  <h1 className={styles.title}>{props.title}</h1>
);

export default HeaderTitle;

HeaderTitle.propTypes = {
  title: PropTypes.string,
}
