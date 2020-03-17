import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from './Card.module.scss';
import IconButton from '../common/IconButton/IconButton';
import PropTypes from 'prop-types';

const Card = (props) => {
  const history = useHistory('/');
  const handleEditCardClick = () => {
    history.push(`/info/${cardInfo.id}`);
  };

  const handleFavoriteCardClick = () => {
    props.toggleCardFavoriteStatus(cardInfo.id);
  };
  const cardInfo = {...props.cardInfo};
  return (
    <li className={styles.card}>
      <h2 className={styles.cardTitle}>{cardInfo.title}</h2>
      <p className={styles.cardText}>{cardInfo.text}</p>
      <div className={styles.cardButtonWrapper}>
        <IconButton
          onClick={handleEditCardClick}
          type="edit"
        />
        <IconButton
          onClick={handleFavoriteCardClick}
          type={cardInfo.isFavorite ? 'dislike' : 'like'}
        />
      </div>
    </li>
  );
};

export default Card;

Card.propTypes = {
  cardInfo: PropTypes.object,
  toggleCardFavoriteStatus: PropTypes.func,
}