/* eslint-disable no-debugger */
import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import HeaderTitle from '../common/HeaderTitle/HeaderTitle';
import Button from '../common/Button/Button';
import PropTypes from 'prop-types';
import Input from '../common/Input/Input';
import styles from './CardForm.module.scss';
import validateValue from './../../helpers/validation/validation';

const CardForm = (props) => {
  const history = useHistory('/');
  const { id } = useParams();
  const urlId = parseInt(id);
  const minInputLength = 4;
  let editedCard = null;
  if (props.type === 'info') {
    editedCard = props.cards.find((card) => card.id === urlId);
  }
  const [inputValue, setInputValue] = useState(editedCard ? editedCard.title : '');
  const [textareaValue, setTextareaValue] = useState(editedCard ? editedCard.text : '');

  const handleChange = (event) => {
    const { target } = event;
    const { value } = target;
    target.name === 'title'
      ? setInputValue(value)
      : setTextareaValue(value);
  };

  const titleValidateSettings = {
    required: true,
    minLength: 4,
    maxLength: 30,
  }

  const handleAddButtonClick = () => {
    if (inputValue.length >= minInputLength) {
      props.addCard(inputValue, textareaValue);
      history.push('/');
    }
  };

  const handleUpdateButtonClick = () => {
    if (inputValue.length >= minInputLength) {
      props.updateCard(urlId, inputValue, textareaValue);
      history.push('/');
    }
  };

  const handleDeleteButtonClick = () => {
    props.removeCard(urlId);
    history.push('/');
  };

  

  return (
    <>
      <HeaderTitle title={props.type === 'new' ? 'New card' : 'Card info'} />
      <form className={styles.form} action="">
        <Input 
          value={inputValue}
          handleChange={(event) => handleChange(event)}
          placeholder="Enter title"
          errorMessage={validateValue(inputValue, titleValidateSettings).errorMessage}
          isValid={validateValue(inputValue, titleValidateSettings).isValid}
          name="title"
        />

        <textarea
          className={styles.formSelect}
          value={textareaValue}
          onChange={(event) => handleChange(event)}
          cols="30"
          rows="10"
        />

        {props.type === 'new' ? (
          <div className={styles.formBtnWrapper}>
            <Button
              onClick={handleAddButtonClick}
              type="default"
              title="Save"
            />
          </div>
        ) : (
          <div className={`${styles.formBtnWrapper} ${styles['formBtnWrapper--edit']}`}>
            <Button
              onClick={handleUpdateButtonClick}
              type="default"
              title="Save"
            />
            <Button
              onClick={handleDeleteButtonClick}
              type="delete"
              title="Delete"
            />
          </div>
        )}
      </form>
    </>
  );
};

export default CardForm;

CardForm.propTypes = {
  type: PropTypes.oneOf(['new', 'info']),
  cards: PropTypes.arrayOf(PropTypes.object),
  addCard: PropTypes.func,
  updateCard: PropTypes.func,
  removeCard: PropTypes.func,
}