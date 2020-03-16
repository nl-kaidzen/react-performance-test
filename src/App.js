import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import CardList from './components/CardList/CardList';
import CardForm from './components/CardForm/CardForm';

const App = () => {
  const [cards, setCards] = useState(
    JSON.parse(localStorage.getItem('cards')) || [],
  );

  useEffect(() => {
    localStorage.setItem('cards', JSON.stringify(cards));
  }, [cards]);

  const addCard = (title, text) => {
    const id = Date.now();
    const createdCard = {
      id,
      title,
      text,
      isFavorite: false,
    };

    setCards([...cards, createdCard]);
  };

  const removeCard = (id) => {
    const newCardsArray = cards.filter((card) => card.id !== id);
    setCards([...newCardsArray]);
  };

  const updateCard = (id, title, text) => {
    const updatedCardElement = cards.find((card) => card.id === id);
    const newCardsArray = [...cards];
    const updatedCardIndex = newCardsArray.indexOf(updatedCardElement);
    const newCardElement = { ...updatedCardElement };
    newCardElement.title = title;
    newCardElement.text = text;
    newCardsArray[updatedCardIndex] = { ...newCardElement };
    setCards([...newCardsArray]);
  };

  const toggleFavorite = (id) => {
    const cardIndex = cards.indexOf(cards.find((card) => card.id === id));
    const newCardsArray = [...cards];
    newCardsArray[cardIndex].isFavorite = !newCardsArray[cardIndex].isFavorite;
    setCards([...newCardsArray]);
  };

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
              onFavoriteClick={toggleFavorite}
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
              onUpdateCard={updateCard}
              onRemoveCard={removeCard}
            />
          )}
        />
        <Route
          path="/create"
          render={(props) => (
            <CardForm
              {...props}
              type="new"
              onAddCard={addCard}
            />
          )}
        />
      </Switch>
    </main>
  );
};

export default App;
