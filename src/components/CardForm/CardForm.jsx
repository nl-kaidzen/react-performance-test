import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import HeaderTitle from '../common/HeaderTitle/HeaderTitle';
import Button from '../common/Button/Button';
import PropTypes from 'prop-types';
import Input from '../common/Input/Input';
import styles from './CardForm.module.scss';
import validateValue from './../../helpers/validation/validation';
import { CARD_TYPE_MAP, BUTTON_TYPES_MAP } from './../../constants/storage';
import { TITLE_VALIDATION_SETTINGS } from './../../helpers/validation/validationSettings';

const CardForm = (props) => {
  const history = useHistory('/');
  const { id } = useParams();
  const isNew = props.type === CARD_TYPE_MAP.new;
  const editedCard = isNew ? null : props.cards[id];
  const initialFieldsValue = {
    title: isNew ? '' : editedCard.title,
    text: isNew ? '' : editedCard.text,
  };
  const [fields, setFields] = useState(initialFieldsValue);

  const handleChange = (event) => {
    const target = event.target;
    setFields({
      ...fields,
      [target.name]: target.value,
    });
  };

  const handleAddButtonClick = () => {
    if (fields.title.length >= TITLE_VALIDATION_SETTINGS.minLength) {
      props.addCard(fields.title, fields.text);
      history.push('/');
    }
  };

  const handleUpdateButtonClick = () => {
    if (fields.title.length >= TITLE_VALIDATION_SETTINGS.minLength) {
      props.updateCard({id, title: fields.title, text: fields.text});
      history.push('/');
    }
  };

  const handleDeleteButtonClick = () => {
    props.removeCard(id);
    history.push('/');
  };

  return (
    <>
      <HeaderTitle title={isNew ? 'New card' : 'Card info'} />
      <form className={styles.form} action="">
        <Input 
          value={fields.title}
          handleChange={(event) => handleChange(event)}
          placeholder="Enter title"
          errorMessage={validateValue(fields.title, TITLE_VALIDATION_SETTINGS).errorMessage}
          isValid={validateValue(fields.title, TITLE_VALIDATION_SETTINGS).isValid}
          name="title"
        />
        <textarea
          className={styles.formSelect}
          value={fields.text}
          onChange={(event) => handleChange(event)}
          cols="30"
          rows="10"
          name="text"
        />
        {isNew ? (
          <div className={styles.formBtnWrapper}>
            <Button
              onClick={handleAddButtonClick}
              type={BUTTON_TYPES_MAP.default}
              title="Save"
            />
          </div>
        ) : (
          <div className={`${styles.formBtnWrapper} ${styles['formBtnWrapper--edit']}`}>
            <Button
              onClick={handleUpdateButtonClick}
              type={BUTTON_TYPES_MAP.default}
              title="Save"
            />
            <Button
              onClick={handleDeleteButtonClick}
              type={BUTTON_TYPES_MAP.delete}
              title="Delete"
            />
          </div>
        )}
      </form>
    </>
  );
};

CardForm.propTypes = {
  type: PropTypes.oneOf([CARD_TYPE_MAP.new, CARD_TYPE_MAP.info]).isRequired,
  cards: PropTypes.objectOf(PropTypes.object).isRequired,
  addCard: PropTypes.func,
  updateCard: PropTypes.func,
  removeCard: PropTypes.func,
}
export default React.memo(CardForm);
