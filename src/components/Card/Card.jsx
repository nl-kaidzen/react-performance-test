import React from 'react';
import styles from './Card.module.scss'

const Card = (props) => {
    return(
        <li className={styles.card}>
            <h2 className={styles.cardTitle}>{props.cardInfo.title}</h2>
            <p className={styles.cardText}>{props.cardInfo.text}</p>
            <div className={styles.cardButtonWrapper}>
                <button>Edit</button>
                <button
                    onClick={() => props.onFavoriteClick(props.cardInfo.id)}
                >
                    {props.cardInfo.isFavorite ? 'Dislike' : 'Like'}
                </button>
            </div>
        </li>
    );
}

export default Card;