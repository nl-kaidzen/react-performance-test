import React from 'react';
import Card from '../Card/Card';
import AddCardButton from '../AddCardButton/AddCardButton';
import HeaderTitle from '../common/HeaderTitle/HeaderTitle';
import styles from './CardList.module.scss';
import PropTypes from 'prop-types';

const CardList = (props) => {
  const cards = props.cards.map((card) => (
    <Card
      cardInfo={card}
      toggleCardFavoriteStatus={props.toggleCardFavoriteStatus}
      key={card.id}
    />
  ));
  return (
    <>
      <HeaderTitle title="Card List" />
      <ul className={styles.list}>
        <AddCardButton key={1} />
        {cards}
      </ul>
    </>
  );
};

export default CardList;

CardList.propTypes ={
  cards: PropTypes.arrayOf(PropTypes.object),
  toggleCardFavoriteStatus: PropTypes.func,
}