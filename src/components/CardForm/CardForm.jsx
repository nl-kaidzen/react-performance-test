import React from 'react';
import PropTypes from 'prop-types';
import Input from '../common/Input/Input';
import styles from './CardForm.module.scss';
import validateValue from 'helpers/validation/validation';
import { TITLE_VALIDATION_SETTINGS } from 'helpers/validation/validationSettings';

const CardForm = ({fields, handleChange}) => {

  return (
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

    </form>
  );
};

CardForm.propTypes = {
  fields: PropTypes.shape({
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }),
  handleChange: PropTypes.func.isRequired,
}
export default React.memo(CardForm);
