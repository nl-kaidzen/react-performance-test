import React, { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import HeaderTitle from 'components/common/HeaderTitle';
import CardForm from 'components/CardForm';
import Button from 'components/common/Button';
import { BUTTON_TYPES_MAP } from 'constants/storage';
import { HOME_ROUTE } from 'constants/routes';
import useValidate from 'hooks/useValidate';
import useFields from 'hooks/useFields';
import PropTypes from 'prop-types';
import VALIDATE_RULES from './validationSettings';
import styles from './style.module.scss';

/**
 * Return new NewCardForm
 * @param {function} addCard   - callback for Save button
 */
const NewCardForm = ({ addCard }) => {
  const history = useHistory(HOME_ROUTE);
  const { fields, handleChange } = useFields({ title: '', text: '' });
  const {
    isFieldValid, errorList, validateForm, validateField,
  } = useValidate(fields, VALIDATE_RULES);

  const handleAddButtonClick = useCallback(() => {
    if (validateForm()) {
      addCard(fields);
      history.push(HOME_ROUTE);
    }
  }, [fields, validateForm, addCard, history]);

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
          >
            Save
          </Button>
        </div>
      </div>
    </>
  );
};

NewCardForm.propTypes = {
  addCard: PropTypes.func.isRequired,
};

// export default NewCardForm;
export default React.memo(NewCardForm);
