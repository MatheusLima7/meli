import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const Remove = styled.button`
  padding: 5px 12px;
  border-radius: 3px;
  background: transparent;
  border: 1px solid rgb(255, 199, 10);
  color: rgb(255, 199, 10);
  font-size: 0.75em;
  margin-right: 15px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease 0s;
  position: relative;

  &:hover {
    background: rgb(255, 199, 10);
    color: rgb(38, 45, 63);
  }
`;

export const Text = styled.span`
  color: #262D3F;
  font-size: 12px;
  font-weight: 700;
`;
