/* istanbul ignore file */

import styled from 'styled-components';

const COLORS_BY_TYPE_MESSAGE = {
  error: '#DB2B2B',
  success: '#298833',
  warning: '#D77B0A',
  default: '#D77B0A',
};

export const Title = styled.span`
  display: block;
  font-size: 12px;
  font-weight: 500;
  color: white;
`;

export const Message = styled.span`
  display: block;
  font-size: 10px;
  font-weight: 700;
  color: white;
`;

type TFeedBackProps = { typeMessage?: 'error' | 'success' | 'warning' };

export const Wrapper = styled.div<TFeedBackProps>`
  left: calc(50% - 192px);
  position: fixed;
  z-index: 10;
  top: 0px;
`;

export const CloseIcon = styled.div`
  cursor: pointer;
`;

export const BoxMessage = styled.div<TFeedBackProps>`
  width: 320px;
  line-height: 20px;
  background: ${({ typeMessage }) => (
    COLORS_BY_TYPE_MESSAGE[typeMessage || 'default']
  )};
  margin: 1.75rem 2rem;
  border-radius: 7px;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  animation-name: translateY;
  animation-duration: 0.8s;

  @keyframes translateY {
    from {
      transform: translateY(-50px);
      opacity: 0;
    }
    to {
      transform: translateY(0px);
      opacity: 1;
    }
  }
`;
