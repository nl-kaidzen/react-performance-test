import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import HeaderTitle from 'components/common/HeaderTitle/HeaderTitle';
import CardForm from 'components/CardForm/CardForm';
import Button from 'components/common/Button/Button';
import styles from './EditCardForm.module.scss';
import { BUTTON_TYPES_MAP } from 'constants/storage';
import { HOME_ROUTE } from 'constants/routes';
import { useValidate } from 'helpers/validation/newValidation';
import PropTypes from 'prop-types';

const EditCardForm = (props) => {
  const history = useHistory(HOME_ROUTE);
  const { id } = useParams();
  const editedCard = props.cards[id];

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

  const handleUpdateButtonClick = () => {
    if (validateForm()) {
      props.updateCard({ id, title: fields.title, text: fields.text });
      history.push(HOME_ROUTE);
    }
  };

  const handleDeleteButtonClick = () => {
    props.removeCard(id);
    history.push(HOME_ROUTE);
  }
  const [isFieldValid, errorList, validateForm, validateField] = useValidate(fields);

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
