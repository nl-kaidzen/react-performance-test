import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import HeaderTitle from '../common/HeaderTitle/HeaderTitle';
import Button from '../common/Button/Button';
import styles from './CardForm.module.scss';
import PropTypes from 'prop-types';

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

  const onChange = (event) => {
    const { target } = event;
    const { value } = target;
    target.name === 'title'
      ? setInputValue(value)
      : setTextareaValue(value);
  };

  const onAddButtonClick = () => {
    if (inputValue.length >= minInputLength) {
      props.addCard(inputValue, textareaValue);
      history.push('/');
    }
  };

  const onUpdateButtonClick = () => {
    if (inputValue.length >= minInputLength) {
      props.updateCard(urlId, inputValue, textareaValue);
      history.push('/');
    }
  };

  const onDeleteButtonClick = () => {
    props.removeCard(urlId);
    history.push('/');
  };
  return (
    <>
      <HeaderTitle title={props.type === 'new' ? 'New card' : 'Card info'} />
      <form className={styles.form} action="">
        <input
          className={styles.formInput}
          value={inputValue}
          onChange={(event) => onChange(event)}
          minLength="4"
          maxLength="255"
          type="text"
          placeholder="Enter title"
          name="title"
          required
        />
        <textarea
          className={styles.formSelect}
          value={textareaValue}
          onChange={(event) => onChange(event)}
          cols="30"
          rows="10"
        />

        {props.type === 'new' ? (
          <div className={styles.formBtnWrapper}>
            <Button
              onClick={onAddButtonClick}
              type="default"
              title="Save"
            />
          </div>
        ) : (
          <div className={`${styles.formBtnWrapper} ${styles['formBtnWrapper--edit']}`}>
            <Button
              onClick={onUpdateButtonClick}
              type="default"
              title="Save"
            />
            <Button
              onClick={onDeleteButtonClick}
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