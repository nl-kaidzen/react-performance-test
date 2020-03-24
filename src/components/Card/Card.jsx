import React from 'react';
import styles from './Card.module.scss';
import IconButton from '../common/IconButton/IconButton';
import { ICON_TYPES_MAP } from './../../constants/storage'
import PropTypes from 'prop-types';

const Card = ({ title, text, id, isFavorite }) => {
  return (
    <li className={styles.card}>
      <h2 className={styles.cardTitle}>{title}</h2>
      <p className={styles.cardText}>{text}</p>
      <div className={styles.cardButtonWrapper}>
        <IconButton
          type={ICON_TYPES_MAP.edit}
          dataId={id}
        />
        <IconButton
          type={isFavorite ? ICON_TYPES_MAP.dislike : ICON_TYPES_MAP.like}
          dataId={id}
        />
      </div>
    </li>
  );
};

Card.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  isFavorite: PropTypes.bool.isRequired,
}

export default React.memo(Card);
