import styled from 'styled-components';

export const Container = styled.div`
flex-direction: column;
overflow: hidden;
display: flex;
`;

export const HorizontalBar = styled.span`
  background: transparent;
  cursor: row-resize;
  min-height: 10px;
  width: 100%;
`;
