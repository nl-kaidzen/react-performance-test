import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './AddCardButton.module.scss';

const AddCardButton = () => (
  <li>
    <NavLink to="/create" className={styles.link}>
      <div className={styles.button}>Add Card</div>
    </NavLink>
  </li>
);

export default React.memo(AddCardButton);
