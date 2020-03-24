import { useState, useCallback }from 'react';
import { getUUID } from './../common/common'

export function useCards(cards) {
  const [cardsState, setCards] = useState(cards);

  const addCard = useCallback(
    (title, text) => {
      const id = getUUID();
      const createdCard = {
        id,
        title,
        text,
        isFavorite: false,
      };

      setCards({...cardsState, [id]: createdCard});
    }, [cardsState]
  );

  const removeCard = useCallback(
    (id) => {
      // eslint-disable-next-line no-unused-vars
      const { [id]: deleted, ...newCardsList} = cardsState;
      setCards(newCardsList);
    }, [cardsState]
  );

  const updateCard = useCallback(
    ({id, title, text}) => {
      const newCardsList = {...cardsState};
      const updatedCardElement = newCardsList[id];
      updatedCardElement.title = title;
      updatedCardElement.text = text;
      setCards(newCardsList);
    }, [cardsState]
  );

  const toggleFavoriteStatus = useCallback(
    (id) => {
      const newCardsList = {...cardsState};
      const updatedCardElement = newCardsList[id];
      updatedCardElement.isFavorite = !updatedCardElement.isFavorite;
      setCards(newCardsList);
    }, [cardsState]
  );

  const api = {addCard, updateCard, removeCard, toggleFavoriteStatus};
  
  return [cardsState, api];
}
