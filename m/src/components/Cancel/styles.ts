import styled from 'styled-components';

export const Icon = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ListItem = styled.div`
  margin-bottom: 0.3rem;
  line-height: 1.25rem;
  font-size: 0.75rem;
  font-weight: 700;
  color: #262d3f;
  width: 50%;
  span {
    font-weight: 500;
  }
`;

export const ModalList = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;
