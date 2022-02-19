import styled from 'styled-components';

type TInputProps = {
  isEnabled?: boolean;
};

const CustomInput = styled.input<TInputProps>`
  display: ${({ isEnabled }) => (isEnabled ? 'flex' : 'none')};
  opacity: ${({ isEnabled }) => (isEnabled ? '1' : '0')};
  background: transparent;
  padding: 0px 5px;
  font-size: 0.75rem;
  line-height: 27px;
  color: #6d7d98;
  width: ${({ isEnabled }) => (isEnabled ? '100%' : '0')};
  box-sizing: border-box;
  outline: none;
  border: none;
  transition: width, opacity 1s ease-in-out;

  &::placeholder {
    color: #6d7d98;
  }
`;

export default CustomInput;
