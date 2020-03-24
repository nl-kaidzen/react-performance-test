import React from 'react';
import styles from './Card.module.scss';
import IconButton from '../common/IconButton/IconButton';
import PropTypes from 'prop-types';

const Card = (props) => {
  /*const handleFavoriteCardClick = useCallback(
    () => {
    props.toggleCardFavoriteStatus(props.cardInfo.id);
  }, []);*/
  return (
    <li className={styles.card}>
      <h2 className={styles.cardTitle}>{props.cardInfo.title}</h2>
      <p className={styles.cardText}>{props.cardInfo.text}</p>
      <div className={styles.cardButtonWrapper}>
        <IconButton
          //onClick={handleEditCardClick}
          type="edit"
          dataId={props.cardInfo.id}
        />
        <IconButton
          //onClick={handleFavoriteCardClick}
          type={props.cardInfo.isFavorite ? 'dislike' : 'like'}
          dataId={props.cardInfo.id}
        />
      </div>
    </li>
  );
};

Card.propTypes = {
  cardInfo: PropTypes.object,
  toggleCardFavoriteStatus: PropTypes.func,
}

export default React.memo(Card);
