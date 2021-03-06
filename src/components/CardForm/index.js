/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import Input from 'components/common/Input';
import Textarea from 'components/common/Textarea';
import withErrorMessage from 'components/hoc/withErrorMessage';
import styles from './style.module.scss';

const InputWithErrorMessage = withErrorMessage(Input);
const TextareaWithErrorMessage = withErrorMessage(Textarea);

/**
 * Return CardForm element.
 * @param {object} fields - object with cards
 * @param {object} errorList - object of errorMessages for validated fields.
 * @param {function} handleChange - callback for onChange - event
 * @param {function} handleBlur - callback for onBlur - event
 */

const CardForm = ({
  fields, handleChange, handleBlur, errorList,
}) => (
  <form className={styles.form}>
    <InputWithErrorMessage
      value={fields.title}
      placeholder="Enter title from 4 to 12 letters"
      name="title"
      errorMessage={errorList.title}
      handleChange={handleChange}
      handleBlur={handleBlur}
    />
    <TextareaWithErrorMessage
      value={fields.text}
      placeholder="Enter text from 6 to 30 letters"
      name="text"
      errorMessage={errorList.text}
      handleChange={handleChange}
      handleBlur={handleBlur}
    />
  </form>
);

CardForm.propTypes = {
  fields: PropTypes.shape({
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
  errorList: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
};
export default React.memo(CardForm);
