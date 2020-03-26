import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import CardList from 'components/CardList/CardList';
import { getCardsFromStorage, setCardsToStorage } from 'helpers/storage/storage';
import { useCards } from 'hooks/useCards';
import { HOME_ROUTE, EDIT_CARD_ROUTE, CREATE_CARD_ROUTE } from 'constants/routes';
import NewCardForm from 'components/NewCardForm/NewCardForm';
import EditCardForm from 'components/EditCardForm/EditCardForm';

const App = () => {
  const [cards, cardsAPI] = useCards(
    getCardsFromStorage() || {},
  );

  const { addCard, updateCard, removeCard, toggleFavoriteStatus } = cardsAPI;

  useEffect(() => {
    return setCardsToStorage(cards);
  }, [cards]);

  return (
    <main>
      <Switch>
        <Route
          exact
          path={HOME_ROUTE}
          render={(props) => (
            <CardList
              {...props}
              cards={cards}
              toggleCardFavoriteStatus={toggleFavoriteStatus}
            />
          )}
        />
        <Route
          path={EDIT_CARD_ROUTE}
          render={(props) => (
            <EditCardForm
              {...props}
              cards={cards}
              updateCard={updateCard}
              removeCard={removeCard}
            />
          )}
        />
        <Route
          path={CREATE_CARD_ROUTE}
          render={(props) => (
            <NewCardForm
              {...props}
              addCard={addCard}
            />
          )}
        />
      </Switch>
    </main>
  );
};

export default App;
