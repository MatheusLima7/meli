import '@testing-library/jest-dom';

import transactionsHandler, { TTransactionsHendler } from '../painel';
import { TItemTable } from '../../../../typing/table';

const MOCK_PAINEL_PARAMS: TItemTable = {
  id: '123',
  ticker: '123',
  ntnbTicker: '123', // BREF
  maturityDate: '2022-09-15T00:00:00', // vencimento
  duration: 1,
  anbima: 1,
  breakEven: 1,
  indexName: '',
  remuneration: 1, // emissão
  emitter: 'emiter', // emissor
  rating: 'rating',
  isFavorite: false,
  bid: {
    fee: 1,
    quantity: 1,
    finantialVolume: 1,
    finalFinantialVolume: 1,
    liquidation: 1,
    finalFee: 1,
    unitPrice: 1,
    finalUnitPrice: 1,
  },
  offer: {
    fee: 1,
    quantity: 1,
    finantialVolume: 1,
    finalFinantialVolume: 1,
    liquidation: 1,
    finalFee: 1,
    unitPrice: 1,
    finalUnitPrice: 1,
  },
};

const mockSubmit = jest.fn();

describe('Prepare painel data', () => {
  it('return empty fields when null parameter', () => {
    const result: TTransactionsHendler = transactionsHandler(undefined, mockSubmit);

    expect(result.name).toEqual('');
    expect(result.ticker).toEqual('');
    expect(result.transactions).toHaveLength(0);
  });

  it('return empty fields treated as expected', () => {
    const result: TTransactionsHendler = transactionsHandler(
      MOCK_PAINEL_PARAMS,
      mockSubmit,
    );

    expect(result.name).toEqual(MOCK_PAINEL_PARAMS.emitter);
    expect(result.ticker).toEqual(MOCK_PAINEL_PARAMS.ticker);
    expect(result.transactions).toHaveLength(2);
    expect(result.transactions[0].title).toEqual('Comprar');
    expect(result.transactions[0].indicators).toHaveLength(4);
    expect(result.transactions[0].formActions).toBeDefined();
    expect(result.transactions[0].disabled).toBeFalsy();

    expect(result.transactions[1].title).toEqual('Vender');
    expect(result.transactions[1].indicators).toHaveLength(4);
    expect(result.transactions[0].formActions).toBeDefined();
    expect(result.transactions[1].disabled).toBeFalsy();

    expect(mockSubmit).not.toBeCalled();
  });
});
