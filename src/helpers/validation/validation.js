const validateValue = (value, validateSettings) => {
  const validateRulesArray = Object.entries(validateSettings);

  let isValid = false;
  let errorMessage = '';

  const VALIDATE_FUNCTIONS_MAP = {
    required: (value) => value.trim() !== '' ? true : false,
    minLength: (value, parameter) => value.length >= parameter ? true : false,
    maxLength: (value, parameter) => value.length <= parameter ? true : false,
  }

  const CREATE_ERROR_FUNCTIONS_MAP = {
    required: () => `Fill this field, please`,
    minLength: (parameter) => `Minimal field length should be more than ${parameter} symbols`,
    maxLength: (parameter) => `Maximum field length should be less than ${parameter} symbols`
  }

  const validateResult = validateRulesArray.map((it) => {
    const parameter = it[0];
    const parameterValue = it[1];
    return VALIDATE_FUNCTIONS_MAP[parameter](value, parameterValue);
  });

  const invalidRuleIndex = validateResult.indexOf(false);
  if (invalidRuleIndex !== -1) {
    const invalidRule = validateRulesArray[invalidRuleIndex];
    const [invalidRuleKey, invalidRuleValue] = invalidRule;
    errorMessage = CREATE_ERROR_FUNCTIONS_MAP[invalidRuleKey](invalidRuleValue);
    isValid = false;
  } else {
    isValid = true;
    errorMessage = '';
  }

  return { isValid, errorMessage };
}

export default validateValue;
