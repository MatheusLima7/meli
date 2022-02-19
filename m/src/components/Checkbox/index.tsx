import React from 'react';
import Wrapper from './Styles';

export type ICheckbox = {
  label: string;
  onChange: (a: string, b: string) => void;
  defaultChecked: boolean;
  id: string;
  value: string;
  name: string;
  testid: string;
};

const Checkbox: React.FC<ICheckbox> = ({
  label,
  onChange,
  defaultChecked = false,
  id,
  value = '',
  name,
  testid,
}: ICheckbox) => (
  <Wrapper key={id}>
    <input
      data-testid={testid}
      checked={defaultChecked}
      onChange={(e) => onChange(name, e.target.value)}
      id={id}
      value={value}
      name={name}
      type="checkbox"
    />

    <label htmlFor={id}>{label}</label>
  </Wrapper>
);

export default Checkbox;
