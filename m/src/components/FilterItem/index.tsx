import React from 'react';
import { Filter } from './styles';
import { TFilterItem } from '../../typing/filters';

const FilterItem = ({
  Component,
  setFilter,
  data,
}: TFilterItem) => (
  <Filter>
    <Component onChange={setFilter} data={data} />
  </Filter>
);

export default FilterItem;
