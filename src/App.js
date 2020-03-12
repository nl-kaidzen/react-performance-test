import React from 'react';
import { Switch, Route } from 'react-router-dom'
import './App.css';
import CardList from './components/CardList/CardList';


const App =(props) => {
  return(
    <main>
      <Switch>
        <Route exact path='/' component={CardList}/>
        <Route path='/info/?id' />
        <Route path='/create' />
      </Switch>
    </main>
  );
}

export default App;
