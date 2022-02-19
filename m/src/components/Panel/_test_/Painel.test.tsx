import { render } from '@testing-library/react';
// eslint-disable-next-line import/no-unresolved
import { Simulate } from 'react-dom/test-utils';
import React from 'react';
import Panel, { TPanel } from '..';
import useOutside from '../../../hooks/useOutside';

const DEFAULT_PROPS: TPanel = {
  isOpen: true,
  closePanel: jest.fn(),
  rowTable: {
    id: '123',
    ticker: '123',
    ntnbTicker: '123', // BREF
    maturityDate: '2022-09-15T00:00:00', // vencimento
    duration: 1,
    anbima: 1,
    remuneration: 'teste', // emissão
    emitter: 'emiter', // emissor
    rating: 'rating',
    isFavorite: false,
    bid: {
      fee: 1,
      quantity: 1,
      finantialVolume: 1,
      liquidation: 1,
      finalFee: 1,
      unitPrice: 1,
    },
    offer: {
      fee: 1,
      quantity: 1,
      finantialVolume: 1,
      liquidation: 1,
      finalFee: 1,
      unitPrice: 1,
    },
  },
  submit: jest.fn,
};

jest.mock('../../../hooks/useOutside', () => jest.fn());

const makeComponentStub = (newProps: TPanel = DEFAULT_PROPS) => (
  render(<Panel {...newProps} />)
);

describe('Painel', () => {
  beforeEach(() => {
    useOutside.mockImplementation(() => ({ listen: jest.fn() }));
  });
  test.skip('Component must render correctly', async () => {
    const { getByTestId } = makeComponentStub();
    const element = getByTestId('painel-wrapper');
    expect(element).toBeTruthy();
  });

  test.skip('Component closeButton must render correctly', async () => {
    const { getByTestId } = makeComponentStub();
    const element = getByTestId('close-button');
    expect(element).toBeTruthy();

    expect(DEFAULT_PROPS.closePanel).not.toBeCalled();

    Simulate.click(element);

    expect(DEFAULT_PROPS.closePanel).toBeCalledTimes(1);
  });
});
