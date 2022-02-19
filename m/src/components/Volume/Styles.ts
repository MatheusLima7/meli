/* istanbul ignore file */

import styled from 'styled-components';

export const Wrapper = styled.div`
  cursor: pointer;
  text-align: center;
  &:hover {
    span {
      display: block;
    }
  }
`;

export const Tooltip = styled.span`
  margin-top: -66px;
  position: absolute;
  display: none;
  padding: 7px;
  background: rgba(255, 255, 255, 0.9);
  color: rgba(1, 1, 1, 0.9);
  border-radius: 4px;
  transition: all 1s ease-in-out;
  z-index: 9;
  top: 35px;
  left: 50%;
  width: 130px;
  margin-left: -65px;
  text-align: center;
`;

type TContent = {
  isSelf: boolean;
}

export const Content = styled.div<TContent>`
  background: ${({ isSelf }) => (isSelf ? '#FFC70A' : 'none')};
  color: ${({ isSelf }) => (isSelf ? '#161B27' : '#FFFFFF ')};
  justify-content: center;
  align-items: center;
  font-weight: 500;
  display: flex;
  height: 29px;
  width: 100%;
`;
