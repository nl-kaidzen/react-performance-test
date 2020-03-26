import React, { useCallback } from 'react';
import { useHistory, generatePath } from 'react-router-dom';
import { EDIT_CARD_ROUTE, HOME_ROUTE } from 'constants/routes';
import Card from '../Card/Card';
import AddCardButton from '../AddCardButton/AddCardButton';
import HeaderTitle from '../common/HeaderTitle/HeaderTitle';
import styles from './CardList.module.scss';
import PropTypes from 'prop-types';

const CardList = (props) => {
  const history = useHistory(HOME_ROUTE);
  const cards = (Object.entries(props.cards).map(([key, card]) => (
    <Card 
      title={card.title}
      text={card.text}
      id={card.id}
      isFavorite={card.isFavorite}
      key={key}
    />
  )));
  const handleClick = useCallback((event) => {
    const target = event.target.closest('button');
    if (target) {
      switch (target.dataset.action) {
        case 'edit': return history.push(generatePath(EDIT_CARD_ROUTE, { id: target.dataset.id }));
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
