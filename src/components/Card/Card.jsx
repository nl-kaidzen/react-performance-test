import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from './Card.module.scss';
import IconButton from '../common/IconButton/IconButton';

const Card = (props) => {
  const history = useHistory('/');
  const onEditCardClick = () => {
    history.push(`/info/${props.cardInfo.id}`);
  };

  const onFavoriteCardClick = () => {
    props.onFavoriteClick(props.cardInfo.id);
  };
  return (
    <li className={styles.card}>
      <h2 className={styles.cardTitle}>{props.cardInfo.title}</h2>
      <p className={styles.cardText}>{props.cardInfo.text}</p>
      <div className={styles.cardButtonWrapper}>
        <IconButton
          onClick={onEditCardClick}
          type="edit"
        />
        <IconButton
          onClick={onFavoriteCardClick}
          type={props.cardInfo.isFavorite ? 'dislike' : 'like'}
        />
      </div>
    </li>
  );
};

export default Card;
