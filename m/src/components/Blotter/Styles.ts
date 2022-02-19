import styled from 'styled-components';

type TWrapper = {
  open?: boolean;
};

export const Wrapper = styled.div<TWrapper>`
  max-height: ${({ open }) => (open ? '18.75rem' : '50px')};
  min-height: 50px;
  transition: all 0.5s ease;
  flex-direction: column;
  padding: 0rem 1rem;
  position: relative;
  display: flex;
  width: 100%;
  z-index: 1;
`;

export const CloseButton = styled.div`
  position: absolute;
  top: 0;
  right: 25px;
  font-size: 36px;
  margin-left: 50px;
`;
