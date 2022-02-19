import React from 'react';
import FilterRadio from '../FilterRadio';
import { RadioContent, Wrapper } from './Styles';
import { TGroupRadio } from '../../typing/filters';

const GroupRadio = ({ data, onChange }: TGroupRadio) => (
  <Wrapper>
    {data.map((radio, index) => (
      <RadioContent key={`groupradio-${index.toString()}`}>
        <FilterRadio
          index={index}
          defaultChecked={radio.defaultChecked}
          id={radio.id}
          name={radio.name}
          label={radio.label}
          value={radio.value}
          onChange={onChange}
        />
      </RadioContent>
    ))}
  </Wrapper>
);

export default GroupRadio;
