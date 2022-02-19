import React from 'react';
import { render } from '@testing-library/react';
import HiddenText, { THiddenText } from '..';

const propsBoxMessageComponent: THiddenText = {
  text: 'texto mensagem',
  maxChar: 10,
};

const makeComponentStub = (_: any, props: THiddenText) => (
  render(<HiddenText {...props} />)
);

describe('BoxMessage Component', () => {
  describe('Render', () => {
    it('should render BoxMessage', () => {
      expect(makeComponentStub(null, propsBoxMessageComponent)).toBeDefined();
    });

    it('should render textComponent', () => {
      const { getByTestId } = makeComponentStub(null, propsBoxMessageComponent);
      const textComponent = getByTestId('text');
      expect(textComponent).toBeDefined();
    });
  });
});
