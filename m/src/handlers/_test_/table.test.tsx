import '@testing-library/jest-dom';
import Table from '../table';
import { TItemTableResponse } from '../../typing/table';
import { mockRequestRunResult } from '../../mocks/runResult';

jest.mock('../../utils/date', () => ({ formatDate: () => 'Ago.2022' }));

describe('Format number', () => {
  it('loads and displays greeting', () => {
    const result: Array<TItemTableResponse> = Table.dataHandler({
      items: mockRequestRunResult,
      negociate: jest.fn(),
    });

    expect(result).toHaveLength(3);

    expect(result[0].bidFinancialVolume).toBeTruthy();
    expect(result[0].offerFinancialVolume).toBeTruthy();
    expect(result[0].negociate).toBeTruthy();
    expect(result[0].bidFee).toEqual('5,02%');
    expect(result[0].bidQuantity).toEqual('100.001');
    expect(result[0].offerFee).toEqual('5,02%');
    expect(result[0].offerQuantity).toEqual('100.001');
    expect(result[0].formattedAnbima).toEqual('1,0000%');
    expect(result[0].formattedDuration).toEqual('1,00');
    expect(result[0].formattedDate).toEqual('Ago.2022');
    expect(result[0].isFavorite).toBeFalsy();
    expect(result[0].fav).toBeDefined();
    expect(result[0].formattedRemuneration).toEqual('IPCA+ 3.3700%');
    expect(result[0].negociate).toBeDefined();
    expect(result[0].formattedEmitter).toBeDefined();

    expect(result[1].bidFinancialVolume).toBeTruthy();
    expect(result[1].offerFinancialVolume).toBeTruthy();
    expect(result[1].negociate).toBeTruthy();
    expect(result[1].bidFee).toEqual('-');
    expect(result[1].bidQuantity).toEqual('0');
    expect(result[1].offerFee).toEqual('-');
    expect(result[1].offerQuantity).toEqual('0');
    expect(result[1].formattedAnbima).toEqual('0%');
    expect(result[1].formattedDuration).toEqual('0');
    expect(result[1].formattedDate).toEqual('Ago.2022');
    expect(result[1].isFavorite).toBeFalsy();
    expect(result[1].fav).toBeDefined();
    expect(result[1].formattedRemuneration).toEqual('IPCA+ 0.0000%');
    expect(result[1].negociate).toBeDefined();
    expect(result[1].formattedEmitter).toBeDefined();

    expect(result[2].bidFinancialVolume).toBeTruthy();
    expect(result[2].offerFinancialVolume).toBeTruthy();
    expect(result[2].negociate).toBeTruthy();
    expect(result[2].bidFee).toEqual('-');
    expect(result[2].bidQuantity).toEqual('-');
    expect(result[2].offerFee).toEqual('-');
    expect(result[2].offerQuantity).toEqual('-');
    expect(result[2].formattedAnbima).toEqual('-');
    expect(result[2].formattedDuration).toEqual('-');
    expect(result[2].formattedDate).toEqual('Ago.2022');
    expect(result[2].isFavorite).toBeFalsy();
    expect(result[2].fav).toBeDefined();
    expect(result[2].formattedRemuneration).toEqual('-');
    expect(result[2].negociate).toBeDefined();
    expect(result[2].formattedEmitter).toBeDefined();
  });
});
