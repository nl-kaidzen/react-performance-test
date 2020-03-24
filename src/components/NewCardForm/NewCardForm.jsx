import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import HeaderTitle from 'components/common/HeaderTitle/HeaderTitle';
import CardForm from 'components/CardForm/CardForm';
import Button from 'components/common/Button/Button';
import styles from './NewCardForm.module.scss';
import { BUTTON_TYPES_MAP } from 'constants/storage';
import { TITLE_VALIDATION_SETTINGS } from 'helpers/validation/validationSettings';
import PropTypes from 'prop-types';

const NewCardForm = (props) => {
  const history = useHistory('/');

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
    if (fields.title.length >= TITLE_VALIDATION_SETTINGS.minLength) {
      props.addCard(fields.title, fields.text);
      history.push('/');
    }
  };

  return (
    <>
      <HeaderTitle title="New Card" />
      <div className={styles.form}>
        <CardForm
          fields={fields}
          handleChange={handleChange}
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
