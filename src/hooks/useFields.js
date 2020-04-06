import { useState, useCallback } from 'react';

const useFields = (initialFields) => {
  const [fields, setFields] = useState(initialFields);
  const handleChange = useCallback((event) => {
    const { target } = event;
    setFields((prevFields) => ({
      ...prevFields,
      [target.name]: target.value,
    }));
  }, [setFields]);

  return {
    fields,
    handleChange,
  };
};

export default useFields;
