import { SomaIcon } from '@soma/react';
import React, { useEffect, useState, useRef } from 'react';
import {
  List,
  Item,
  Wrapper,
  SelectedItem,
  Icon,
  Text,
} from './Styles';
import useOutside from '../../hooks/useOutside';

export type TOption = {
  label: string;
  value: number;
};

export type TSelect = {
  defaultValue: number;
  options: TOption[];
};

const Select = ({ options = [], defaultValue }: TSelect) => {
  const [selected, setSelected] = useState(
    options.find((item) => item.value === defaultValue),
  );
  const [openSelect, setOpenSelect] = useState<boolean>(false);
  useEffect(() => {
    setSelected(options.find((item) => item.value === defaultValue));
  }, [defaultValue, options]);

  const wrapperRef = useRef(null);
  useOutside(wrapperRef).listen(() => setOpenSelect(false));

  return (
    <Wrapper ref={wrapperRef}>
      <SelectedItem
        data-testid="selected-item"
        onClick={() => setOpenSelect(!openSelect)}
      >
        <Text>{selected?.label}</Text>
        <Icon>
          <SomaIcon
            size="sm"
            icon={`solid-arrow-${openSelect ? 'up' : 'down'}`}
            color="#ffffff"
          />
        </Icon>
      </SelectedItem>
      {openSelect && (
        <List>
          {options.map((option, index) => (
            <Item
              key={`list-item${index.toString()}`}
              onClick={() => setSelected(option)}
            >
              {option.label}
            </Item>
          ))}
        </List>
      )}
    </Wrapper>
  );
};

export default Select;
