import React, { useState, useCallback } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import HeaderTitle from 'components/common/HeaderTitle';
import CardForm from 'components/CardForm';
import Button from 'components/common/Button';
import styles from './style.module.scss';
import { BUTTON_TYPES_MAP } from 'constants/storage';
import { HOME_ROUTE } from 'constants/routes';
import { useValidate } from 'hooks/useValidate';
import { VALIDATE_RULES } from './validationSettings';
import PropTypes from 'prop-types';

/**
 * Return new EditCardForm
 * Attribute is object with keys:
 * @param {object} cards          - object of cards
 * @param {function} updateCard   - callback for Update button
 * @param {function} removeCard   - callback for Delete button
 */
const EditCardForm = ({ cards, updateCard, removeCard }) => {
  const history = useHistory(HOME_ROUTE);
  const { id } = useParams();
  const editedCard = cards[id];

  const initialFieldsValue = {
    title: editedCard.title,
    text: editedCard.text,
  };
  const [fields, setFields] = useState(initialFieldsValue);

  const handleChange = (event) => {
    const target = event.target;
    setFields({
      ...fields,
      [target.name]: target.value,
    });
  };

  const handleUpdateButtonClick = useCallback(() => {
    if (validateForm()) {
      updateCard({ id, fields });
      history.push(HOME_ROUTE);
    }
  }, [id, fields]);

  const handleDeleteButtonClick = useCallback(() => {
    removeCard(id);
    history.push(HOME_ROUTE);
  }, [id, fields]);
  const [isFieldValid, errorList, validateForm, validateField] = useValidate(fields, VALIDATE_RULES);

  return (
    <>
      <HeaderTitle title="Edit Card" />
      <div className={styles.form}>
        <CardForm
          fields={fields}
          isFieldValid={isFieldValid}
          errorList={errorList}
          handleChange={handleChange}
          handleBlur={validateField}
        />
        <div className={`${styles.formBtnWrapper} ${styles['formBtnWrapper--edit']}`}>
          <Button
            onClick={handleUpdateButtonClick}
            type={BUTTON_TYPES_MAP.default}
            title="Update"
          />
          <Button
            onClick={handleDeleteButtonClick}
            type={BUTTON_TYPES_MAP.delete}
            title="Delete"
          />
        </div>
      </div>
    </>
  );
}

EditCardForm.propTypes = {
  cards: PropTypes.objectOf(PropTypes.object).isRequired,
  updateCard: PropTypes.func.isRequired,
  removeCard: PropTypes.func.isRequired,
}

export default React.memo(EditCardForm);
