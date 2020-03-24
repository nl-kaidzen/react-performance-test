import React from 'react';
import { Link } from 'react-router-dom';
import styles from './AddCardButton.module.scss';
import { createCardRoute } from 'constants/routes';

const AddCardButton = () => (
  <li>
    <Link 
      to={createCardRoute} 
      className={styles.link}
      aria-label="Create new card"
    >
      <div className={styles.button}>Add Card</div>
    </Link>
  </li>
);

export default React.memo(AddCardButton);
