import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  background: #262d3f;
  display: flex;
  justify-content: space-between;
`;

export const Icon = styled.div`
  width: 32px;
  height: 60px;
  padding: 22px 30px;
  align-items: center;
  justify-content: center;
  display: flex;
  align-items: center;
  cursor: pointer;
  border-right: solid 1px #2e374c;
  position: relative;

  span {
    content: '';
    width: 8px;
    height: 8px;
    display: inline;
    background: rgb(255, 199, 10);
    border-radius: 50%;
    animation: pulsate 1000ms ease-out;
    animation-iteration-count: infinite;
    position: absolute;
    top: 20px;
    right: 20px;
  }

  @keyframes pulsate {
    0% {
      opacity: 0.1;
    }
    40% {
      opacity: 1;
    }
    60% {
      opacity: 1;
    }
    100% {
      opacity: 0.1;
    }
  }
`;

export const Image = styled.img``;

export const Button = styled.button`
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

export const ContentLeft = styled.div`
  display: flex;
`;

export const ContentRight = styled.div`
  display: flex;
  align-items: center;
`;
