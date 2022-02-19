import styled from "styled-components";

interface IWrapperProps {
  color?: string
}

export const Wrapper = styled.p<IWrapperProps>`
  color: ${({ color }) => color || '#fff'};
  font-family: Roboto, sans-serif;
  font-size: 0.75rem;
`;
