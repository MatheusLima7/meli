import styled from 'styled-components';

export const Wrapper = styled.tr`
  &.selected {
    td {
      background: #3A445E;
    }
  }
  &:hover {
    td {
      background: #394360;
    }
  }
`;

type TCell = {
  padding?: string;
}

export const Cell = styled.td<TCell>`
  background: rgb(31, 36, 51);
  white-space: nowrap;
  position: relative;
  border-left: 1px solid rgb(16, 18, 26);
  border-bottom: 1px solid rgb(16, 18, 26);
  font-family: Roboto;
  font-size: 0.75em;
  font-weight: 300;
  padding: ${({ padding }) => padding || 3}px;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: rgb(255, 255, 255);
  text-align: ${({ align }) => (align || 'center')};
  border-collapse: inherit;
  border-spacing: 0;
  vertical-align: inherit;
  max-width: 0px;
`;
