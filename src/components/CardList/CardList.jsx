import React from 'react';
import Card from '../Card/Card';
import AddCardButton from '../AddCardButton/AddCardButton';
import HeaderTitle from '../common/HeaderTitle/HeaderTitle';
import styles from './CardList.module.scss';
import PropTypes from 'prop-types';

const CardList = (props) => {
  const cards = (Object.entries(props.cards).map(([key, card]) => (
    <Card 
      cardInfo={card}
      toggleCardFavoriteStatus={props.toggleCardFavoriteStatus}
      key={key}
    />
  )));
  const handleClick = (event) => {
    const target = event.target.closest('button');
    if (target) {
      switch (target.dataset.action) {
        case 'edit': return console.log('Catch edit');
        case 'like': return console.log('Catch like');
        case 'dislike': return console.log('Catch dislike')
      }
    }
  }
  return (
    <>
      <HeaderTitle title="Card List" />
      <ul 
        className={styles.list}
        onClick={handleClick}>
        <AddCardButton key={1} />
        {cards}
      </ul>
    </>
  );
};

CardList.propTypes ={
  cards: PropTypes.objectOf(PropTypes.object),
  toggleCardFavoriteStatus: PropTypes.func,
}

export default React.memo(CardList);
