import React from 'react';
import Card from '../Card/Card';
import AddCardButton from '../AddCardButton/AddCardButton';
import styles from './CardList.module.scss'

const CardList =(props) => {
    return(
        <ul className={styles.list}>
            <AddCardButton />
            <Card />
            <Card />
            <Card />
        </ul>
    );
}

export default CardList;