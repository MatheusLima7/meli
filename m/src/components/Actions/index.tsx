import React from 'react';
import { Wrapper } from './Styles';
import CancelItem from '../CancelItem';

type TActions = {
  offerSide: number;
  ticker: string;
  isSelf: boolean;
  onClick: (rowTicker: string, offerSide: number) => void;
}

const Actions = ({
  offerSide,
  ticker,
  isSelf,
  onClick,
}: TActions) => (
  <Wrapper>
    {isSelf && (
      <CancelItem onClick={() => onClick(ticker, offerSide)} />
    )}
  </Wrapper>
);

export default Actions;
