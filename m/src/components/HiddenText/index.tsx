import React from 'react';

import { HiddenTextContainer } from './Styles';

export type THiddenText = {
  text: string;
  maxChar?: number;
};

const HiddenText = ({ text, maxChar }: THiddenText) => (
  <HiddenTextContainer maxChar={maxChar}>
    <span data-testid="text">{text}</span>
  </HiddenTextContainer>
);

export default HiddenText;
