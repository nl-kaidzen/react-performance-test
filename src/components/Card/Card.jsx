import React from 'react';
import styles from './Card.module.scss';
import IconButton from '../common/IconButton/IconButton';
import { ICON_TYPES_MAP } from './../../constants/storage'
import PropTypes from 'prop-types';

const Card = (props) => {
  return (
    <li className={styles.card}>
      <h2 className={styles.cardTitle}>{props.cardInfo.title}</h2>
      <p className={styles.cardText}>{props.cardInfo.text}</p>
      <div className={styles.cardButtonWrapper}>
        <IconButton
          type={ICON_TYPES_MAP.edit}
          dataId={props.cardInfo.id}
        />
        <IconButton
          type={props.cardInfo.isFavorite ? ICON_TYPES_MAP.dislike : ICON_TYPES_MAP.like}
          dataId={props.cardInfo.id}
        />
      </div>
    </li>
  );
};

Card.propTypes = {
  cardInfo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    isFavorite: PropTypes.bool.isRequired,
  }),
  toggleCardFavoriteStatus: PropTypes.func.isRequired,
}

export default React.memo(Card);
