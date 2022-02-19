import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 140px;
  display: block;
  float: right;
`;

type TListProps = {
  isEnabled: boolean;
};

type TContainer = {
  ref: any;
};

export const Container = styled.ul<TContainer>`
  display: contents;
`;

export const List = styled.ul<TListProps>`
  display: ${({ isEnabled }) => (isEnabled ? 'flex' : 'none')};
  width: 170px;
  height: 364px;
  position: absolute;
  right: -3rem;
  top: 1.75rem;
  z-index: 9;
  flex-direction: column;
  background: #2e374c;
  padding: 0.4rem 0.4rem 0rem 0.4rem;
  margin: 0rem;

  li {
    list-style: none;
    color: #ffffff;
  }
`;

export const Item = styled.li`
  width: 140px;
  height: 40px;
  width: 100%;
`;

export const EditIcon = styled.span`
  display: flex;
  font-size: 12px;
  color: #c8cacd;
  cursor: pointer;
`;

export const Text = styled.span`
  margin: 2px 0 0 8px;
  color: #c8cacd;
`;
