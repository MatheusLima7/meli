import React, { useEffect, useState } from 'react';
import Checkbox from '../Checkbox';
import { TFilterDataOptions } from '../../typing/filters';
import utilFilter from '../../utils/filters';
import utilGoogleAnalitycs from '../../utils/ga';

const FilterCheckbox = ({
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
    setChecked(utilFilter.getFilterCheckbox(name, value, defaultChecked));
    setMounted(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {!!mounted && (
      <Checkbox
        testid={`teste${index}`}
        defaultChecked={checked}
        id={id}
        name={name}
        label={label}
        value={value}
        onChange={(a: string, b: string) => {
          setChecked(!checked);

          utilGoogleAnalitycs.setGA(
            'event',
            `Checkbox ${label}`,
            !checked ? 'habilitado' : 'desabilitado',
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

export default FilterCheckbox;
