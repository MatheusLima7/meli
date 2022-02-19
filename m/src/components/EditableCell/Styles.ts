import styled from 'styled-components';

export const Wrapper = styled.div`
  cursor: pointer;
`;

type TInput = {
  isSelf?: boolean;
  hasError?: boolean;
  selectedNameLine?: string;
  name?: string;
}

type TTooltip = {
  hasError?: boolean;
  index: number;
  hasWarning?: boolean;
}

export const Tooltip = styled.div<TTooltip>`
  display: none;
  background: #FFFFFF;
  color: #696969;
  border-radius: 2px;
  position: absolute;
  line-height: 16px;
  z-index: 9;
  bottom: 45px;
  padding: 5px;
  width: 110px;
  left: 50%;
  margin-left: -55px;
  word-wrap: break-word;
  hyphens: auto;
  white-space: normal;

  ${({ index }) => (index < 4 ? `
    bottom: initial;
    top: 32px;
  ` : '')}

  &:before {
    content: '';
    position: absolute;
    width: 6.4px;
    height: 6.4px;
    background: #FFFFFF;
    margin-top: 3.2px;
    margin-left: -3.2px;
    transform: rotate(-45deg);
    bottom: -3px;
    left: 50%;

    ${({ index }) => (index < 4 ? `
      bottom: initial;
      top: -6px;
    ` : '')}
  }

  ${({ hasError, hasWarning }) => (hasError || hasWarning ? `
    display: block;
  ` : '')}
`;

const getBackgroundInput = (selectedNameLine?: string, name?: string) => (selectedNameLine === name ? '#A5B2C4' : '#2E374D');

export const StyleInput = styled.input<TInput>`
  width: 100%;
  background: ${({ isSelf, selectedNameLine, name }) => (
    isSelf ? '#FFC70A' : getBackgroundInput(selectedNameLine, name)
  )};
  color: ${({ isSelf }) => (isSelf ? '#161B27' : '#FFFFFF')};
  text-align: center;
  cursor: pointer;
  height: 29px;
  outline: none;
  border: none;

  &:focus {
    background: ${({ isSelf }) => (isSelf ? '#FFE699' : '#FFFFFF ')} !important;
    color: ${({ isSelf }) => (isSelf ? '#161B27' : '#262D3F ')} !important;
    ${(isSelf) => (isSelf ? `
      ::selection {
        background: #A6C7D1;
      }
    ` : '')}
  }


  ${({ hasError }) => (hasError ? `
    background: #FFFFFF !important;
    border: solid 1px #DB2B2B;
  ` : '')}
`;

type TEmptyValue = {
  isSelf?: boolean;
}

export const EmptyValue = styled.div<TEmptyValue>`
  width: 100%;
  background: ${({ isSelf }) => (isSelf ? '#FFC70A' : '#2E374D')};
  color: ${({ isSelf }) => (isSelf ? '#161B27' : '#FFFFFF')};
  justify-content: center;
  align-items: center;
  font-weight: 500;
  height: 1.8rem;
  display: flex;
  outline: none;
  border: none;
`;
