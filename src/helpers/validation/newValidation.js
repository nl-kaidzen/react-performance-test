import { useState } from 'react';

const VALIDATE_FUNCTIONS_MAP = {
  required: (value) => value.trim() !== '' ? true : false,
  minLength: (value, minLength) => value.length >= minLength ? true : false,
  maxLength: (value, maxLength) => value.length <= maxLength ? true : false,
};

const GENERATE_ERRORS_FUNCTIONS_MAP = {
  required: () => `Please fill this field`,
  minLength: (minLength) => `Minimal field length should be more than ${minLength} symbols`,
  maxLength: (maxLength) => `Minimal field length should be more than ${maxLength} symbols`,
};

const ERROR_LIST_INITIAL_MAP = {
  title: '',
  text: '',
};

const validateRules = {
  title: {
    required: true,
    minLength: 4,
    maxLength: 12,
  },
  text: {
    required: true,
    minLength: 6,
    maxLength: 30
  }
};

const generateErrorMessage = (rule, fieldName) => {
  const failedRuleLimitingValue = validateRules[fieldName][rule];
  return GENERATE_ERRORS_FUNCTIONS_MAP[rule](failedRuleLimitingValue);
};

const validateFieldValue = (value, fieldName) => {
  let isFieldValid = false;
  let errorMessage = '';

  const validationRulesForField = validateRules[fieldName];
  const validationRulesFromEntries = Object.entries(validationRulesForField);

  const validationResultArray = validationRulesFromEntries.map(([rule, ruleValue]) => {
    const isValid = VALIDATE_FUNCTIONS_MAP[rule](value, ruleValue);
    return [rule, isValid];
  });

  // eslint-disable-next-line no-unused-vars
  const firstFailedRule = validationResultArray.find(([rule, validateValue]) => validateValue === false);
  if (firstFailedRule === undefined) {
    isFieldValid = true;
    errorMessage = '';
  } else {
    const [failedRule, validationStatus] = firstFailedRule;
    isFieldValid = validationStatus;
    errorMessage = generateErrorMessage(failedRule, fieldName);
  }

  return [isFieldValid, errorMessage]; 
};

export const useValidate = (fields) => {
  const [isFormValid, setFormValid] = useState(false);
  const [isFieldValid, setFieldValid] = useState(false);
  const [errorList, setError] = useState({
    ...ERROR_LIST_INITIAL_MAP,
  });
  const formValidationStatusByEachField = {};
  const formErrorList = {};

  const validateForm = () => {
    const fieldsArrayFromEntries = Object.entries(fields);
    fieldsArrayFromEntries.forEach(([fieldName, fieldValue]) => {
      const [fieldIsValid, fieldErrorMessage] = validateFieldValue(fieldValue, fieldName);
      formValidationStatusByEachField[fieldName] = fieldIsValid;
      formErrorList[fieldName] = fieldErrorMessage;
    }); 
    setError(formErrorList);//TODO: Change to reduce
    
    const validateStatusArrayForEachField = Object.values(formValidationStatusByEachField);
    if (validateStatusArrayForEachField.indexOf(false) === -1) {
      setFormValid(true);
      return isFormValid;
    }
  }

  const validateField = (event) => {
    const currentField = event.target;
    const currentFieldValue = fields[currentField.name];
    const [validationValue, errorMessage] = validateFieldValue(currentFieldValue, currentField.name);
    setFieldValid(validationValue);
    setError({
      ...errorList,
      [currentField.name]: errorMessage,
    })
  };

  return [isFieldValid, errorList, validateForm, validateField];
}