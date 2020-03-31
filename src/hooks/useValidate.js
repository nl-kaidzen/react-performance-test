/* eslint-disable no-unused-vars */
import { useState, useCallback } from 'react';

const VALIDATE_FUNCTIONS_MAP = {
  required: (value) => (value.trim() !== ''),
  minLength: (value, minLength) => (value.length >= minLength),
  maxLength: (value, maxLength) => (value.length <= maxLength),
};

const GENERATE_ERRORS_FUNCTIONS_MAP = {
  required: () => 'Please fill this field',
  minLength: (minLength) => `Minimal field length should be more than ${minLength} symbols`,
  maxLength: (maxLength) => `Minimal field length should be more than ${maxLength} symbols`,
};

const ERROR_LIST_INITIAL_MAP = {
  title: '',
  text: '',
};

const generateErrorMessage = (rule, fieldName, validateRules) => {
  const failedRuleLimitingValue = validateRules[fieldName][rule];
  return GENERATE_ERRORS_FUNCTIONS_MAP[rule](failedRuleLimitingValue);
};

/**
 *
 *
 * @param {string} value - current value;
 * @param {string} fieldName - name of current validated field;
 * @param {object} validateRules - Ex: { required: true, minLength: 6, maxLength: 12 };
 *
 * @returns {array} - [rule: string, isValid: boolean]
 * rule: name of failed rule (Ex: required, manLength, etc...);
 * isValid: boolean value
 */

const validateFieldValue = (value, fieldName, validateRules) => {
  let isFieldValid = false;
  let errorMessage = '';

  const validationRulesForField = validateRules[fieldName];
  const validationRulesFromEntries = Object.entries(validationRulesForField);

  const validationResultArray = validationRulesFromEntries.map(([rule, ruleValue]) => {
    const isValid = VALIDATE_FUNCTIONS_MAP[rule](value, ruleValue);
    return [rule, isValid];
  });

  const firstFailedRule = validationResultArray
    .find(([rule, validateValue]) => validateValue === false);
  if (firstFailedRule === undefined) {
    isFieldValid = true;
    errorMessage = '';
  } else {
    const [failedRule, validationStatus] = firstFailedRule;
    isFieldValid = validationStatus;
    errorMessage = generateErrorMessage(failedRule, fieldName, validateRules);
  }

  return [isFieldValid, errorMessage];
};

/**
 * useValidate - Hook, which used for validating forms.
 *
 * @param {object} fields - An object with all values of validated input fields.
 *                          Ex: { title: 'Title', text: 'Text' }
 * @param {object} validateRules - Ex: { required: true, minLength: 6, maxLength: 12 }
 *
 * @returns {array} - Array with values and functions. Check another comments for nasted functions
 */

function useValidate(fields, validateRules) {
  const [isFieldValid, setFieldValid] = useState(false);
  const [errorList, setError] = useState({
    ...ERROR_LIST_INITIAL_MAP,
  });
  const formValidationStatusByEachField = {};
  const formErrorList = {};

  /**
   * validateForm - functions, which used for validate all form. Use as onSubmit - effect.
   *
   * @returns {boolean} - is form valid (true | false).
   */

  const validateForm = useCallback(() => {
    const fieldsArrayFromEntries = Object.entries(fields);
    const reducer = (accumulator, [fieldName, fieldValue]) => {
      const [fieldIsValid, fieldErrorMessage] = validateFieldValue(
        fieldValue, fieldName, validateRules,
      );
      formErrorList[fieldName] = fieldErrorMessage;
      return {
        ...accumulator,
        [fieldName]: fieldIsValid,
      };
    };
    const formValidationStatusArray = fieldsArrayFromEntries.reduce(reducer, {});
    setError(formErrorList);// TODO: Change to reduce

    const validateStatusArrayForEachField = Object.values(formValidationStatusArray);
    return validateStatusArrayForEachField.every((elem) => elem !== false);
  }, [fields]);

  /**
   * validatedField - functions, which used for validate single field.
   *                  Use as onBlur or onChange - effect.
   *
   * @param {object} event - native object from the browser.
   *                         This object contains all information about the validated field.
   */

  const validateField = useCallback((event) => {
    const currentField = event.target;
    const currentFieldValue = fields[currentField.name];
    const [validationValue, errorMessage] = validateFieldValue(
      currentFieldValue, currentField.name, validateRules,
    );
    setFieldValid(validationValue);
    setError((prevErrorList) => ({
      ...prevErrorList,
      [currentField.name]: errorMessage,
    }));
  }, [fields]);

  return {
    isFieldValid, errorList, validateForm, validateField,
  };
}

export default useValidate;
