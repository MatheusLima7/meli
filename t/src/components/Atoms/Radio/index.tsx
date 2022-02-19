import React from 'react'

import Wrapper from './styles'

type IRadio = {
  label: string;
  onChange: Function;
  defaultChecked?: boolean;
  id: string;
  value?: string;
  name: string;
}

const Radio: React.FC<IRadio> = ({
  label,
  onChange,
  defaultChecked = false,
  id,
  value,
  name,
}: IRadio) => (
  <Wrapper>
    <input
      defaultChecked={defaultChecked}
      onChange={e => onChange(name, e.target.value)}
      id={id}
      value={value}
      name={name}
      type="radio"
    />

    <label htmlFor={id}>{label}</label>
  </Wrapper>
)

export default Radio;
