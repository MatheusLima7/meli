import styled from 'styled-components';

export const Thead = styled.thead`
  display: table-header-group;
  background-color: #161B27;
  position: sticky;
  z-index: 1;
  top: 0px;
`;
export const Tr = styled.tr`
  display: table-row;
`;

type TTH = {
  borderColor?: string;
  hidden?: boolean;
  width?: number;
  ref?: any;
}

export const Th = styled.th<TTH>`
  text-overflow: ellipsis;
  border-spacing: 0rem;
  display: ${({ hidden }) => (hidden ? 'none' : 'table-cell')};
  font-style: normal;
  font-size: 0.75rem;
  position: relative;
  line-height: 1rem;
  overflow: hidden;
  font-weight: 300;
  height: 1.75rem;
  color: #FFF;
  &.composite-column {
    font-weight: 700;
  }
  
  border-left: 1px solid #10121A;
  border-top: 1px solid #10121A;
  &:last-child {
    border-right: 1px solid #10121A;
  }
  &[colspan="3"] {
    font-weight: 700;
    color: #fff;
  }

  &.border-right {    
    border-right: ${({ borderColor }) => (borderColor ? `1px solid ${borderColor}` : 'none')};
  }
  &.border-left {    
    border-left: ${({ borderColor }) => (borderColor ? `1px solid ${borderColor}` : 'none')};
  }
  &.border-top {    
    border-top: ${({ borderColor }) => (borderColor ? `1px solid ${borderColor}` : 'none')};
  }
`;

export const RowCell = styled.div`
  justify-content: center;
  flex-direction: row;
  display: flex;
  cursor: pointer;
  .sort-icon {
    margin-left: 0.25rem;
    align-items: center;
    display: flex;
  }
`;

export const SortButton = styled.button`
  outline: inherit;
  background: none;
  cursor: pointer;
  color: inherit;
  font: inherit;
  border: none;
  padding: 0;
`;
