import styled from 'styled-components'

export const Wrapper = styled.div`
  animation: spinner-rotate 1s linear infinite;

  @keyframes spinner-rotate {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
