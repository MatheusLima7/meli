/* istanbul ignore file */

import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  padding: 20px;
  max-width: 100%;

  img {
    max-height: 120px;
    display: inline-block;
    margin-bottom: 20px;
  }
`;

export const Container = styled.div`
  transition: margin-right 0.5s;
  flex-direction: column;
  display: flex;
`;

type THomeContainer = {
  ticker?: string;
  name?: string;
}

export const HomeContainer = styled.div<THomeContainer>`
    justify-content: space-between;
    height: calc(100vh - 60px);
    flex-direction: column;
    padding-top: 0.625rem;
    background: #10121A;
    position: relative;
    overflow: hidden;
    display: flex;

    .header-cell {
      display: flex;
    }

    ${({ ticker, name }) => (ticker && name ? `
      .number-format-${ticker}-${name}-fee:not(.is-self), .number-format-${ticker}-${name}-quantity:not(.is-self) {
        background: #A5B2C4;
        color: #262D3F;
      }
    ` : '')}
`;

type TFeedBackProps = {
  error?: boolean;
};

export const Title = styled.span`
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 1.25rem;
  padding: 0rem 1.25rem;
`;

export const Message = styled.span`
  display: block;
  font-size: 10px;
  font-weight: 700;
  color: white;
`;

export const BoxMessage = styled.div<TFeedBackProps>`
  background:${({ error }) => (
    error ? 'rgba(212, 72, 72, 0.95)' : 'rgba(103, 173, 112 ,0.95)'
  )} ;
  justify-content: space-evenly;
  border-radius: 7px;
  position: relative;
  padding: 15px 16px;
  line-height: 20px;
  margin: 10px auto;
  position: fixed;
  display: flex;
  width: 320px;
  z-index: 10;
`;
