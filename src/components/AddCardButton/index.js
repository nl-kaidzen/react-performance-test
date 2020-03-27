import React from 'react';
import { Link } from 'react-router-dom';
import styles from './style.module.scss';
import { CREATE_CARD_ROUTE } from 'constants/routes';

const AddCardButton = () => (
  <li>
    <Link 
      to={CREATE_CARD_ROUTE} 
      className={styles.link}
      aria-label="Create new card"
    >
      <div className={styles.button}>Add Card</div>
    </Link>
  </li>
);

export default React.memo(AddCardButton);
