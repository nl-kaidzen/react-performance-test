import React from "react";
import styles from './HeaderTitle.module.scss'

const HeaderTitle = (props) => {
  return (
    <h1 className={styles.title}>{props.title}</h1>
  );
};

export default HeaderTitle;
