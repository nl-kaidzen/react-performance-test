import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom'
import Card from '../Card/Card';
import AddCardButton from '../AddCardButton/AddCardButton';
import HeaderTitle from '../common/HeaderTitle/HeaderTitle';
import styles from './CardList.module.scss';
import PropTypes from 'prop-types';

const CardList = (props) => {
  const history = useHistory('/');
  const cards = (Object.entries(props.cards).map(([key, card]) => (
    <Card 
      cardInfo={card}
      toggleCardFavoriteStatus={props.toggleCardFavoriteStatus}
      key={key}
    />
  )));
  const handleClick = useCallback((event) => {
    const target = event.target.closest('button');
    if (target) {
      switch (target.dataset.action) {
        case 'edit': return history.push(`/info/${target.dataset.id}`);
        case 'like': return props.toggleCardFavoriteStatus(target.dataset.id);
        case 'dislike': return props.toggleCardFavoriteStatus(target.dataset.id);
      }
    }
  }, []);
  return (
    <>
      <HeaderTitle title="Card List" />
      <ul 
        className={styles.list}
        onClick={handleClick}>
        <AddCardButton />
        {cards}
      </ul>
    </>
  );
};

CardList.propTypes ={
  cards: PropTypes.objectOf(PropTypes.object).isRequired,
  toggleCardFavoriteStatus: PropTypes.func.isRequired,
}

export default React.memo(CardList);
