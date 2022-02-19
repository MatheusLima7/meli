/* istanbul ignore file */

import styled from 'styled-components';

type TWrapperProps = {
  isEnabled: boolean;
};

export const Wrapper = styled.div<TWrapperProps>`
  display: flex;
  margin: 0rem 0.4rem;
  padding: 0;
  background: ${({ isEnabled }) => (isEnabled ? '#FFFFFF' : 'transparent')};
  height: 23px;
  align-items: center;
  width: ${({ isEnabled }) => (isEnabled ? '100%' : '16px')};
  -webkit-transition: all 1s ease-in-out;
  -moz-transition: all 1s ease-in-out;
  -o-transition: all 1s ease-in-out;
  transition: all 1s ease-in-out;
`;

export const CustomIcon = styled.div`
  cursor: pointer;
  margin-left: 0.375rem;
`;
