import React from 'react';

const Card = (props) => {
    return(
        <li>
            <h2>Title</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci vitae harum quod, blanditiis</p>
            <div>
                <button>Edit</button>
                <button>Like</button>
            </div>
        </li>
    );
}

export default Card;