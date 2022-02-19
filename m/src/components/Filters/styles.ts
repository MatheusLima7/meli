import styled from 'styled-components';

export const FiltersContainer = styled.div`
  justify-content: space-between;
  flex-direction: row;
  align-items: baseline;
  display: flex;
  width: 100%;
  position: relative;
`;

export const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 80%;
`;

export const FilterOptionsContainer = styled.div`
  min-height: 1.75rem;
  align-items: center;
  margin-right: 1.8rem;
  position: absolute;
  display: flex;
  right: 0rem;
`;

export const Filter = styled.div`
  border: 1px solid #10121a;
  min-height: 1.75rem;
  align-items: center;
  padding-left: 1rem;
  display: flex;
`;
