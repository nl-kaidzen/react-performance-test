import React, { useCallback } from 'react';
import { useHistory, generatePath } from 'react-router-dom';
import { EDIT_CARD_ROUTE, HOME_ROUTE } from 'constants/routes';
import Card from 'components/Card';
import AddCardButton from 'components/AddCardButton';
import HeaderTitle from 'components/common/HeaderTitle';
import styles from './style.module.scss';
import PropTypes from 'prop-types';

const CardList = ({ cards, toggleCardFavoriteStatus}) => {
  const history = useHistory(HOME_ROUTE);
  const cardsList = (Object.entries(cards).map(([key, card]) => (
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
        case 'like': return toggleCardFavoriteStatus(target.dataset.id);
        case 'dislike': return toggleCardFavoriteStatus(target.dataset.id);
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
        {cardsList}
      </ul>
    </>
  );
};

CardList.propTypes ={
  cards: PropTypes.objectOf(PropTypes.object).isRequired,
  toggleCardFavoriteStatus: PropTypes.func.isRequired,
}

export default React.memo(CardList);
