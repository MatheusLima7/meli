import styled from 'styled-components';

type TWrapper = {
  open?: boolean;
  ref: any;
};

export const Wrapper = styled.div<TWrapper>`
  height: calc(100vh - 60px);
  width: ${({ open }) => (open ? '250px' : '0')};
  position: absolute;
  z-index: 1;
  right: 0;
  transform: translateY(-0.625em);
  background-color: #262d3f;
  overflow: hidden;
  transition: 0.5s;
  padding: 0.75rem 0rem;
`;

export const CloseButton = styled.div`
  position: absolute;
  top: 7px;
  right: 1.4375rem;
  font-size: 36px;
  cursor: pointer;
`;
