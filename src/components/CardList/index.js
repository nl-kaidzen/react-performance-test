/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useCallback } from 'react';
import { useHistory, generatePath } from 'react-router-dom';
import { EDIT_CARD_ROUTE, HOME_ROUTE } from 'constants/routes';
import Card from 'components/Card';
import AddCardButton from 'components/AddCardButton';
import HeaderTitle from 'components/common/HeaderTitle';
import PropTypes from 'prop-types';
import styles from './style.module.scss';

/**
 * Return new CardList Element, based on Card - elements
 * @param {object} cards - object with cards
 * @param {function} toggleCardFavoriteStatus - callback for onClick - event.
 */
const CardList = ({ cards, toggleCardFavoriteStatus }) => {
  const history = useHistory(HOME_ROUTE);


  // Without useCallback

  const handleFavoriteClick = (event) => {
    const { currentTarget: { dataset } } = event;
    toggleCardFavoriteStatus(dataset.id);
  };

  const handleEditClick = (event) => {
    const { currentTarget: { dataset } } = event;
    history.push(generatePath(EDIT_CARD_ROUTE, { id: dataset.id }));
  };

  // With useCallback
  /* const handleFavoriteClick = useCallback((event) => {
    const { currentTarget: { dataset } } = event;
    toggleCardFavoriteStatus(dataset.id);
  }, []);

  const handleEditClick = useCallback((event) => {
    const { currentTarget: { dataset } } = event;
    history.push(generatePath(EDIT_CARD_ROUTE, { id: dataset.id }));
  }, [history]); */

  const cardsList = (Object.entries(cards).map(([key, card]) => (
    <Card
      title={card.title}
      text={card.text}
      id={card.id}
      isFavorite={card.isFavorite}
      key={key}
      handleFavoriteClick={handleFavoriteClick}
      handleEditClick={handleEditClick}
    />
  )));
  return (
    <>
      <HeaderTitle title="Card List" />
      <ul
        className={styles.list}
      >
        <AddCardButton />
        {cardsList}
      </ul>
    </>
  );
};

CardList.propTypes = {
  cards: PropTypes.objectOf(PropTypes.object).isRequired,
  toggleCardFavoriteStatus: PropTypes.func.isRequired,
};

export default CardList;
// export default React.memo(CardList);
