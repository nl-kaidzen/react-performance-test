import React, { useEffect, useMemo, useCallback } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import { getCardsFromStorage, setCardsToStorage } from 'helpers/storage';
import { preventLeave } from 'helpers/preventLeave';
import useCards from 'hooks/useCards';
import { HOME_ROUTE, EDIT_CARD_ROUTE, CREATE_CARD_ROUTE } from 'constants/routes';
import CardList from 'components/CardList';
import NewCardForm from 'components/NewCardForm';
import EditCardForm from 'components/EditCardForm';

/**
 * The root component of the application. Contains routing for navigation.
 * Uses the useCards-hook to work with cards. Saves cards to the localStorage when unmounting.
 */
const App = () => {
  const memoizedCards = useMemo(() => getCardsFromStorage(), []);
  const {
    cards, addCard, updateCard, removeCard, toggleFavoriteStatus,
  } = useCards(memoizedCards);

  const leavePageHandler = useCallback((event) => {
    preventLeave(event);
    setCardsToStorage(cards);
  }, [cards]);

  useEffect(() => {
    window.addEventListener('beforeunload', leavePageHandler);
    return () => window.removeEventListener('beforeunload', leavePageHandler);
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
