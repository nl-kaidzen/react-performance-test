import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import HeaderTitle from 'components/common/HeaderTitle/HeaderTitle';
import CardForm from 'components/CardForm/CardForm';
import Button from 'components/common/Button/Button';
import styles from './EditCardForm.module.scss';
import { BUTTON_TYPES_MAP } from 'constants/storage';
import { homeRoute } from 'constants/routes';
import { TITLE_VALIDATION_SETTINGS } from 'helpers/validation/validationSettings';
import PropTypes from 'prop-types';

const EditCardForm = (props) => {
  const history = useHistory(homeRoute);
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
    if (fields.title.length >= TITLE_VALIDATION_SETTINGS.minLength) {
      props.updateCard({ id, title: fields.title, text: fields.text });
      history.push(homeRoute);
    }
  };

  const handleDeleteButtonClick = () => {
    props.removeCard(id);
    history.push(homeRoute);
  }

  return (
    <>
      <HeaderTitle title="Edit Card" />
      <div className={styles.form}>
        <CardForm
          fields={fields}
          handleChange={handleChange}
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
