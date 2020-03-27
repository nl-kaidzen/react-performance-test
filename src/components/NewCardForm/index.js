import React, { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import HeaderTitle from 'components/common/HeaderTitle';
import CardForm from 'components/CardForm';
import Button from 'components/common/Button';
import { BUTTON_TYPES_MAP } from 'constants/storage';
import { HOME_ROUTE } from 'constants/routes';
import useValidate from 'hooks/useValidate';
import PropTypes from 'prop-types';
import VALIDATE_RULES from './validationSettings';
import styles from './style.module.scss';

/**
 * Return new NewCardForm
 * Attribute is object with keys:
 * @param {function} addCard   - callback for Save button
 */
const NewCardForm = ({ addCard }) => {
  const history = useHistory(HOME_ROUTE);
  const initialFieldsValue = {
    title: '',
    text: '',
  };
  const [fields, setFields] = useState(initialFieldsValue);
  const [isFieldValid, errorList,
    validateForm, validateField] = useValidate(fields, VALIDATE_RULES);

  const handleChange = (event) => {
    const { target } = event;
    setFields({
      ...fields,
      [target.name]: target.value,
    });
  };

  const handleAddButtonClick = useCallback(() => {
    if (validateForm()) {
      addCard(fields);
      history.push(HOME_ROUTE);
    }
  }, [fields]);

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
};

NewCardForm.propTypes = {
  addCard: PropTypes.func.isRequired,
};

export default React.memo(NewCardForm);
