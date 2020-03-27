import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import HeaderTitle from 'components/common/HeaderTitle';
import CardForm from 'components/CardForm';
import Button from 'components/common/Button';
import styles from './style.module.scss';
import { BUTTON_TYPES_MAP } from 'constants/storage';
import { HOME_ROUTE } from 'constants/routes';
import { useValidate } from 'hooks/useValidate';
import { VALIDATE_RULES } from './validationSettings';
import PropTypes from 'prop-types';

const NewCardForm = ({ addCard }) => {
  const history = useHistory(HOME_ROUTE);

  const initialFieldsValue = {
    title: '',
    text: '',
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
    debugger;
    if (validateForm()) {
      addCard(fields.title, fields.text);
      history.push(HOME_ROUTE);
    }
  };

  const [isFieldValid, errorList, validateForm, validateField] = useValidate(fields, VALIDATE_RULES);

  return (
    <>
      <HeaderTitle title="New Card" />
      <div className={styles.form}>
        <CardForm
          fields={fields}
          isFieldValid={isFieldValid}
          errorList={errorList}
          handleChange={handleChange}
          handleBlur={validateField}
        />
        <div className={styles.formBtnWrapper}>
          <Button
            onClick={handleAddButtonClick}
            type={BUTTON_TYPES_MAP.default}
            title="Save"
          />
        </div>
      </div>
    </>
  );
}

NewCardForm.propTypes = {
  addCard: PropTypes.func.isRequired,
}

export default React.memo(NewCardForm);
