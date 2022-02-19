import styled from 'styled-components';

export const VerticalBar = styled.span`
  background: transparent;
  position: absolute;
  cursor: col-resize;
  min-width: 6px;
  display: flex;
  height: 100%;
  right: -3px;
  top: 0px;
`;

export default VerticalBar;
