import styled from 'styled-components';

export const HiddenTextContainer = styled.div<{ maxChar?: number }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  span {
    width: ${({ maxChar }) => (maxChar ? `${maxChar}ch` : 'auto')};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export default HiddenTextContainer;
