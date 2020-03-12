import React from 'react';
import Card from './Card';

const CardList =(props) => {
    return(
        <ul>
            <Card />
            <Card />
            <Card />    
        </ul>
    );
}

export default CardList;