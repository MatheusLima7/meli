import React from 'react';

import CustomInput from './Styles';

type TInput = {
  onChange: (a: string, b: string) => void;
  placeholder: string;
  field: string;
  isEnabled: boolean;
};

const Input = ({
  onChange,
  placeholder,
  field,
  isEnabled,
}: TInput) => (
  <CustomInput
    isEnabled={isEnabled}
    onChange={(e) => onChange(field, e.target.value)}
    placeholder={placeholder}
  />
);

export default Input;
