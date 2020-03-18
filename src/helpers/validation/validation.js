const validateValue = (value, validateSettings) => {
    const validateKeys = Object.keys(validateSettings);
    let isValid = false;
    let errorMessage = '';
    let req = false;
    let minL = false;
    let maxL = false;
    validateKeys.forEach((key) => {
      switch (key) {
        case 'required': {
          req = value.trim() !== '' ? true : false;
          !req ? errorMessage = 'Please fill this field.' : errorMessage;
          return req;
        }
        case 'minLength': {
          minL = (value.length >= validateSettings[key]) ? true : false;
          !minL ? errorMessage = `Length of value should be longer than ${validateSettings[key]} symbols.` : errorMessage;
          return minL;
        }
        case 'maxLength': {
          maxL = (value.length <= validateSettings[key])  ? true : false;
          !maxL ? errorMessage = `Length of value should be shorter than ${validateSettings[key]} symbols.` : errorMessage;
          return maxL;
        }
      }
    });
    isValid = (req && minL && maxL) ? true : false;
    return {isValid, errorMessage};
  }

  export default validateValue;