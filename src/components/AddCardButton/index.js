import React from 'react';
import { Link } from 'react-router-dom';
import { CREATE_CARD_ROUTE } from 'constants/routes';
import styles from './style.module.scss';

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
