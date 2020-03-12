import React from 'react';
import styles from './Card.module.scss'

const Card = (props) => {
    return(
        <li className={styles.card}>
            <h2 className={styles.cardTitle}>Title</h2>
            <p className={styles.cardText}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci vitae harum quod, blanditiis</p>
            <div className={styles.cardButtonWrapper}>
                <button>Edit</button>
                <button>Like</button>
            </div>
        </li>
    );
}

export default Card;