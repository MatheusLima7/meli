import React, { useEffect, useState } from 'react';
import Radio from '../Radio';
import { TFilterDataOptions } from '../../typing/filters';
import utilFilter from '../../utils/filters';
import utilGoogleAnalitycs from '../../utils/ga';

const FilterRadio = ({
  index,
  defaultChecked,
  id,
  name,
  label,
  value,
  onChange,
}: TFilterDataOptions) => {
  const [checked, setChecked] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setChecked(utilFilter.getFilterRadio(name, value, defaultChecked));
    setMounted(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {!!mounted && (
      <Radio
        testid={`teste${index}`}
        defaultChecked={checked}
        id={id}
        name={name}
        label={label}
        value={value}
        onChange={(a: string, b: string, c: boolean) => {
          setChecked(c);

          utilGoogleAnalitycs.setGA(
            'event',
            `Radio ${label}`,
            c ? 'habilitado' : 'desabilitado',
          );

          utilFilter.setFilter(name, value);
          if (onChange) {
            onChange(a, b);
          }
        }}
      />
      )}
    </>
  );
};

export default FilterRadio;
