import React, { useMemo } from 'react';
import ErrorLabel from 'components/common/ErrorLabel';
import PropTypes from 'prop-types';

function withErrorMessage(TextComponent) {
  const FieldWithError = ({
    value, placeholder, name, errorMessage, handleChange, handleBlur,
  }) => (
    <>
      <TextComponent
        value={value}
        placeholder={placeholder}
        name={name}
        handleChange={handleChange}
        handleBlur={handleBlur}
      />
      <ErrorLabel
        errorMessage={errorMessage}
      />
    </>
  );

  FieldWithError.propTypes = {
    value: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    errorMessage: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleBlur: PropTypes.func.isRequired,
  };
  return React.memo(FieldWithError);
}

export default withErrorMessage;
