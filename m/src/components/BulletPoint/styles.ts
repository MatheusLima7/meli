import styled from 'styled-components';

type TBall = {
  color: string;
};

export const Wrapper = styled.div`
  width: 100%;
`;

export const Ball = styled.span<TBall>`
  width: 9px;
  height: 9px;
  border-radius: 9px;
  background: ${({ color }) => color || '#298833'};
  top: 0px;
  display: inline-block;
  margin-right: 6px;
`;
