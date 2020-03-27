import React from 'react';
import PropTypes from 'prop-types';
import Input from 'components/common/Input';
import Textarea from 'components/common/Textarea';
import styles from './style.module.scss';

const CardForm = ({
  fields, handleChange, handleBlur, errorList,
}) => (
  <form className={styles.form}>
    <Input
      value={fields.title}
      placeholder="Enter title from 4 to 12 letters"
      name="title"
      errorMessage={errorList.title}
      handleChange={handleChange}
      handleBlur={handleBlur}
    />
    <Textarea
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
