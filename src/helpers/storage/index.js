import { CARD_STORAGE_KEY } from 'constants/storage';

export const getCardsFromStorage = () => (
  JSON.parse(localStorage.getItem(CARD_STORAGE_KEY)) || {});
export const setCardsToStorage = (cards) => (
  localStorage.setItem(CARD_STORAGE_KEY, JSON.stringify(cards)));
