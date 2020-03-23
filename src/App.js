/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import CardList from './components/CardList/CardList';
import CardForm from './components/CardForm/CardForm';
import { getCardsFromStorage, setCardsToStorage } from './helpers/storage/storage';
import { getUUID } from './helpers/common/common';

const App = () => {
  const [cards, setCards] = useState(
    getCardsFromStorage() || {},
  );

  useEffect(() => {
    setCardsToStorage(cards);
  }, [cards]);

  const addCard = useCallback(
    (title, text) => {
      const id = getUUID();
      const createdCard = {
        id,
        title,
        text,
        isFavorite: false,
      };

      setCards({...cards, [id]: createdCard});
    }, [cards]
  );

  const removeCard = useCallback(
    (id) => {
      const { [id]: deleted, ...newCardsList} = cards;
      setCards(newCardsList);
    }, [cards]
  );

  const updateCard = useCallback(
    ({id, title, text}) => {
      const newCardsList = {...cards};
      const updatedCardElement = newCardsList[id];
      updatedCardElement.title = title;
      updatedCardElement.text = text;
      setCards(newCardsList);
    }, [cards]
  );

  const toggleCardFavoriteStatus = useCallback(
    (id) => {
      const newCardsList = {...cards};
      const updatedCardElement = newCardsList[id];
      updatedCardElement.isFavorite = !updatedCardElement.isFavorite;
      setCards(newCardsList);
    }, [cards]
  );

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
              toggleCardFavoriteStatus={toggleCardFavoriteStatus}
            />
          )}
        />
        <Route
          path="/info/:id?"
          render={(props) => (
            <CardForm
              {...props}
              type="info"
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
              type="new"
              addCard={addCard}
            />
          )}
        />
      </Switch>
    </main>
  );
};

export default App;
