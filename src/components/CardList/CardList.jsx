import React from 'react';
import Card from '../Card/Card';
import AddCardButton from '../AddCardButton/AddCardButton';
import HeaderTitle from '../common/HeaderTitle/HeaderTitle';
import styles from './CardList.module.scss';

const CardList = (props) => {
  const cards = props.cards.map((card) => (
    <Card
      cardInfo={card}
      onFavoriteClick={props.onFavoriteClick}
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
