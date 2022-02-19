import React from 'react';
import { Wrapper, CheckboxContent, NewCheckBox } from './Styles';
import { TGroupCheckbox } from '../../typing/filters';
import FilterCheckbox from '../FilterCheckbox';

const GroupCheckbox = ({ data, onChange }: TGroupCheckbox) => (
  <Wrapper>
    {data.map((checkbox, index) => (
      <CheckboxContent key={`groupcheckbox-${index.toString()}`}>
        <FilterCheckbox
          index={index}
          defaultChecked={checkbox.defaultChecked}
          id={checkbox.id}
          name={checkbox.name}
          label={checkbox.label}
          value={checkbox.value}
          onChange={onChange}
        />
        {!!checkbox.isNew && (<NewCheckBox><span>novo</span></NewCheckBox>)}
      </CheckboxContent>
    ))}
  </Wrapper>
);

export default GroupCheckbox;
