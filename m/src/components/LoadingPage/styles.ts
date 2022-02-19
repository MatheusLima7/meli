import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(22, 27, 39, 0.5);
  z-index: 10;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;

export const Text = styled.span`
  color: #ffffff;
  margin: 10px 0;
  line-height: 22px;
  font-size: 16px;
`;

export const Line = styled('div')`
  display: flex;
  justify-content: center;
  text-transform: uppercase;

  img {
    width: 120px;
  }
`;
