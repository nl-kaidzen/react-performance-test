import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import CardList from './components/CardList/CardList';
import CardForm from './components/CardForm/CardForm';
import { getCardsFromStorage, setCardsToStorage } from './helpers/storage/storage';
import { useCards } from './helpers/useCards/useCards';
import { CARD_TYPE_MAP } from './constants/storage'

const App = () => {
  const [cards, cardsAPI] = useCards(
    getCardsFromStorage() || {},
  );

  const {addCard, updateCard, removeCard, toggleFavoriteStatus} = cardsAPI;

  useEffect(() => {
    setCardsToStorage(cards);
  }, [cards]);

  return (
    <main>
      <Switch>
        <Route
          exact
          path="/"
          render={(props) => (
            <CardList
              {...props}
              cards={cards}
              toggleCardFavoriteStatus={toggleFavoriteStatus}
            />
          )}
        />
        <Route
          path="/info/:id?"
          render={(props) => (
            <CardForm
              {...props}
              type={CARD_TYPE_MAP.info}
              cards={cards}
              updateCard={updateCard}
              removeCard={removeCard}
            />
          )}
        />
        <Route
          path="/create"
          render={(props) => (
            <CardForm
              {...props}
              type={CARD_TYPE_MAP.new}
              addCard={addCard}
            />
          )}
        />
      </Switch>
    </main>
  );
};

export default App;
