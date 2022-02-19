import styled from 'styled-components';

export const Wrapper = styled.div`
  height: 24px;
  position: relative;
  margin-right: 80px;
`;

export const List = styled.ul`
  position: absolute;
  width: 100%;
  z-index: 9;
  list-style: none;
  padding: 0;
  top: 9px;
  left: -5px;
  -webkit-box-shadow: 1px 1px 8px 1px #000000;
  box-shadow: 1px 1px 8px 1px #000000;
`;

export const Item = styled.li`
  line-height: 24px;
  padding: 5px 10px;
  background: #ffffff;
  font-size: 14px;
  text-align: center;
  margin: 2px 0;
  cursor: pointer;

  &:hover {
    background: #e6f7ff;
  }
`;

export const SelectedItem = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
  width: 140px;
  justify-content: space-between;
  top: 4px;
`;

export const Icon = styled.div`
  margin-left: 7px;
`;

export const Text = styled.span`
  color: #ffffff;
  font-size: 16px;
  font-style: normal;
`;
