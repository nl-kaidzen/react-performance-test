import React, { useState } from 'react';
import styles from './CardForm.module.scss'
import HeaderTitle from '../common/HeaderTitle';
import { useHistory } from 'react-router-dom';

const CardForm = (props) => {
  const [inputValue, setInputValue] = useState('');
  const [textareaValue, setTextareaValue] = useState('');

  const onChange = (event) => {
    const target = event.target;
    const value = target.value;
    target.name === 'title'
    ? setInputValue(value)
    : setTextareaValue(value);
  }

  const history = useHistory('/');
  const onSaveClick = () => {
    props.onSaveClick(inputValue, textareaValue);
    history.push('/')
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
              onClick={onSaveClick}
              type="button">Save</button>
          </div>
        ) : (
            <div className="buttonWrapper">
              <button type="button">Save</button>
              <button type="button">Delete</button>
            </div>
          )}
      </form>
    </>
  );
};

export default CardForm;
