import React, { useState } from 'react';
import styles from './CardForm.module.scss'
import HeaderTitle from '../common/HeaderTitle';
import { useHistory, useParams } from 'react-router-dom';

const CardForm = (props) => {
  const history = useHistory('/');
  let { id } = useParams();
  const urlId = parseInt(id);
  let editedCard = null;
  if (props.type === 'info') {
    editedCard = props.cards.find((card) => card.id === urlId);
  } 
  const [inputValue, setInputValue] = useState( editedCard ? editedCard.title : '' );
  const [textareaValue, setTextareaValue] = useState( editedCard ? editedCard.text : '' );

  const onChange = (event) => {
    const target = event.target;
    const value = target.value;
    target.name === 'title'
    ? setInputValue(value)
    : setTextareaValue(value);
  }

  const onAddButtonClick = () => {
    props.onAddCard(inputValue, textareaValue);
    history.push('/');
  }

  const onUpdateButtonClick = () => {
    props.onUpdateCard(urlId, inputValue, textareaValue);
    history.push('/');
  }

  const onDeleteButtonClick = () => {
    props.onRemoveCard(urlId);
    history.push('/');
  }
  return (
    <>
      <HeaderTitle title={props.type === 'new' ? 'New card' : 'Card info'} />
      <form className={styles.form} action="">
        <input
          className={styles.formInput}
          value={inputValue}
          type="text"
          placeholder="Enter title"
          name="title"
          onChange={(event) => onChange(event)} 
        />
        <textarea 
          className={styles.formSelect} 
          value={textareaValue}
          onChange={(event) => onChange(event)}
          name="" id="" cols="30" rows="10" 
        />

        {props.type === 'new' ? (
          <div className="buttonWrapper">
            <button 
              onClick={onAddButtonClick}
              type="button">Save</button>
          </div>
        ) : (
            <div className="buttonWrapper">
              <button 
                onClick={onUpdateButtonClick}
                type="button">Save</button>
              <button 
                onClick={onDeleteButtonClick}
                type="button">Delete</button>
            </div>
          )}
      </form>
    </>
  );
};

export default CardForm;
