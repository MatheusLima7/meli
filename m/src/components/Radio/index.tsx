import React, { useEffect, useState } from 'react';

import Wrapper from './Styles';

type IRadio = {
  label: string;
  onChange: (a: string, b: string, checked: boolean) => void;
  defaultChecked: boolean | null;
  id: string;
  value: string;
  name: string;
  testid: string;
};

const Radio: React.FC<IRadio> = ({
  label,
  onChange,
  defaultChecked,
  id,
  value = '',
  name,
  testid,
}: IRadio) => {
  const [initialChecked, setInitialChecked] = useState<boolean>(!!defaultChecked);
  const [checked, setChecked] = useState<boolean | undefined>(undefined);
  useEffect(() => {
    setInitialChecked(!!defaultChecked);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Wrapper data-testid={testid}>
      <input
        defaultChecked={initialChecked}
        onChange={(e) => {
          setChecked(!checked);
          onChange(name, e.target.value, !checked);
        }}
        id={id}
        value={value}
        name={name}
        type="radio"
      />

      <label htmlFor={id}>{label}</label>
    </Wrapper>
  );
};

export default Radio;
