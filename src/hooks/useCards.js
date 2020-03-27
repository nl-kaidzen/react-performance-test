import { useState, useCallback } from 'react';
import getUUID from 'helpers/common';

/**
 *
 * @param {object} cards -    Object of objects (card)
 *
 * @returns {array} -         [cardState, api]
 *                  -         cardState - updated cards object
 *                  -         api - object of functions, which used for manipulate cards-object
 */

function useCards(cards) {
  const [cardsState, setCards] = useState(cards);

  /**
   * Arrow function for add new card into cards - object
   *
   * @param {object} fields - object of fields, used in form. Ex: { title: 'title', text: 'text' };
   */

  const addCard = useCallback(
    (fields) => {
      const id = getUUID();
      const createdCard = {
        id,
        ...fields,
        isFavorite: false,
      };

      setCards({ ...cardsState, [id]: createdCard });
    }, [cardsState],
  );

  /**
   * Arrow function for remove card with this id
   *
   * @param {string} id - Key of card
   */

  const removeCard = useCallback(
    (id) => {
      // eslint-disable-next-line no-unused-vars
      const { [id]: deleted, ...newCardsList } = cardsState;
      setCards(newCardsList);
    }, [cardsState],
  );

  /**
   * Arrow function for update card with this id
   *
   * @param {string} id -     Key of card
   * @param {object} fields - object of fields, used in form. Ex: { title: 'title', text: 'text' };
   */

  const updateCard = useCallback(
    ({ id, fields }) => {
      const newCardsList = { ...cardsState };
      newCardsList[id] = {
        ...newCardsList[id],
        ...fields,
      };
      setCards(newCardsList);
    }, [cardsState],
  );

  /**
   * Arrow function for toggle Like/Dislike status for card with this id
   *
   * @param {string} id - Key of card
   */

  const toggleFavoriteStatus = useCallback(
    (id) => {
      const newCardsList = { ...cardsState };
      const updatedCardElement = newCardsList[id];
      updatedCardElement.isFavorite = !updatedCardElement.isFavorite;
      setCards(newCardsList);
    }, [cardsState],
  );

  const api = {
    addCard, updateCard, removeCard, toggleFavoriteStatus,
  };

  return [cardsState, api];
}

export default useCards;
