import React from 'react';
import EditColumns from '../EditColumns';
import Search from '../Search';
import { Wrapper, EditColumnsContainer } from './Styles';
import { TGroupFilterOptions } from '../../typing/filters';

const FilterOptions = ({
  columns,
  setSearch,
  editColumns,
}: TGroupFilterOptions) => (
  <Wrapper>
    <Search setFilter={setSearch} />
    <EditColumnsContainer>
      <EditColumns columns={columns} editColumns={editColumns} />
    </EditColumnsContainer>
  </Wrapper>
);

export default FilterOptions;
