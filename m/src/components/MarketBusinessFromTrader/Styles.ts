/* istanbul ignore file */
import styled from 'styled-components';

type TWrapper = {
  open?: boolean;
  active?: boolean;
};

export const TableContainer = styled.div<TWrapper>`
  display: ${({ active }) => (active ? 'flex' : 'none')};
  height: ${({ open }) => (open ? '100%' : '0px')};
  transition: all 0.5s ease;

  flex-direction: column;
  position: relative;
  min-height: 2rem;

  td[role='cell'] {
    text-align: center;
  }
`;

export const Text = styled.span``;
