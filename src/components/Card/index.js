import React from 'react';
import IconButton from 'components/common/IconButton';
import { ICON_TYPES_MAP } from 'constants/storage';
import PropTypes from 'prop-types';
import styles from './style.module.scss';

/**
 * Return new Card element.
 * @param {string} title - value for title
 * @param {string} text - value for text
 * @param {string} id - id of current card. used for onClick-events and validation
 * @param {boolean} isFavorite - card's current status
 */
const Card = ({
  title, text, id, isFavorite, handleEditClick, handleFavoriteClick,
}) => (
  <li className={styles.card}>
    <h2 className={styles.cardTitle}>{title}</h2>
    <p className={styles.cardText}>{text}</p>
    <div className={styles.cardButtonWrapper}>
      <IconButton
        iconType={ICON_TYPES_MAP.edit}
        dataId={id}
        handleClick={handleEditClick}
      />
      <IconButton
        iconType={isFavorite ? ICON_TYPES_MAP.dislike : ICON_TYPES_MAP.like}
        dataId={id}
        handleClick={handleFavoriteClick}
      />
    </div>
  </li>
);

Card.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  handleEditClick: PropTypes.func.isRequired,
  handleFavoriteClick: PropTypes.func.isRequired,
};

export default Card;
// export default React.memo(Card);
