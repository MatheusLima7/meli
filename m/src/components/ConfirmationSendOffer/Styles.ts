import styled from 'styled-components';

export const Wrapper = styled.div`
  flex-direction: column;
  display: flex;
`;
export const AlertMessage = styled.div`
  align-items: flex-start;
  flex-direction: row;
  display: flex;
  margin-top: 1rem;
  svg {
    margin-right: 0.25rem;
    color: #FBC105;
    min-width: 15px;
  }
  span {
    line-height: 0.875rem;
    font-size: 0.625rem;
    color: #262D3F;
  }
`;
