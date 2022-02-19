import React from 'react';
import {
  Content,
  FiltersContainer,
  FilterOptionsContainer,
} from './styles';
import FilterItem from '../FilterItem';
import FilterOptions from '../FilterOptions';
import { TGroupFilterOptions, TFilters } from '../../typing/filters';

const Filters = ({
  filterOptions,
  setFilter,
  setSearch,
  columns,
  editColumns,
}: TFilters & TGroupFilterOptions) => (
  <FiltersContainer data-testid="home-filters">
    <Content>
      {filterOptions.map((option) => {
        const { Component, data, id } = option;
        return (
          <FilterItem
            key={`filter-${id}`}
            Component={Component}
            setFilter={setFilter}
            data={data}
          />
        );
      })}
    </Content>
    <FilterOptionsContainer>
      <FilterOptions
        setSearch={setSearch}
        columns={columns}
        editColumns={editColumns}
      />
    </FilterOptionsContainer>
  </FiltersContainer>
);

export default Filters;
