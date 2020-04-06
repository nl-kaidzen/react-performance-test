import { useState, useCallback } from 'react';
import { getUUID } from 'helpers/common';

/**
 * @param {object} cards - Object of objects (card)
 * @returns {object} - Object with new cards, errors, validate status and validate methods
 */
function useCards(cards) {
  const [cardsState, setCards] = useState(cards);

  /**
   * Arrow function for add new card into cards - object
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

      setCards((prevCardsState) => ({ ...prevCardsState, [id]: createdCard }));
    }, [setCards],
  );

  /**
   * Arrow function for remove card with this id
   * @param {string} id - Key of card
   */
  const removeCard = useCallback(
    (id) => {
      setCards((prevCardsState) => {
        const { [id]: deleted, ...newCardsList } = prevCardsState;
        return newCardsList;
      });
    }, [setCards],
  );

  /**
   * Arrow function for update card with this id
   * @param {string} id - Key of card
   * @param {object} fields - object of field: value, used in form.
   */
  const updateCard = useCallback(
    ({ id, fields }) => {
      // eslint-disable-next-line no-debugger
      debugger;
      setCards((prevCardsState) => {
        const newCardsList = { ...prevCardsState };
        newCardsList[id] = {
          ...newCardsList[id],
          ...fields,
        };
        return newCardsList;
      });
    }, [setCards],
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
    }, [setCards],
  );

  return {
    cards: cardsState,
    addCard,
    updateCard,
    removeCard,
    toggleFavoriteStatus,
  };
}

export default useCards;
