import React, { useState } from 'react';
import { Switch, Route} from 'react-router-dom'
import './App.css';
import CardList from './components/CardList/CardList';
import CardForm from './components/CardForm/CardForm';

const App = () => {
  const [cards, setCards] = useState(
    JSON.parse(localStorage.getItem('cards')) || []
  );

  React.useEffect(() => {
    localStorage.setItem('cards', JSON.stringify(cards))
  }, [cards])

  const addCard = (title, text) => {
    const id = new Date();
    const createdCard = {
      id: id,
      title: title,
      text: text,
      isFavorite: false,
    };

    setCards([...cards, createdCard]);
  };

  // const updateCard = () => {};

  const toggleFavorite = (id) => {
    const cardIndex = cards.indexOf(cards.find((card) => card.id === id));
    const newCardsArray = [...cards];
    newCardsArray[cardIndex].isFavorite = !newCardsArray[cardIndex].isFavorite;
    setCards([...newCardsArray]);
  };

  return(
    <main>
      <Switch>
        <Route 
          exact path='/' 
          render={(props) => <CardList {...props} 
            cards={cards}
            onFavoriteClick={toggleFavorite}/>} 
        />
        <Route path='/info/?id' />
        <Route 
          path='/create' 
          render={(props) => <CardForm {...props}
            type={'new'}
            onSaveClick={addCard} 
            />} 
        />
      </Switch>
    </main>
  );
}

export default App;
