import '@testing-library/jest-dom';
import Table from '../tableSendOffers';
import { TItemTableResponse } from '../../typing/table';
import { mockRequestRunResult } from '../../mocks/runResult';

jest.mock('../../utils/date', () => ({ formatDate: () => 'Ago.2022' }));
jest.mock('../../utils/referenceCells', () => ({
  setRefFocus: jest.fn(),
  setRef: jest.fn(),
}));

describe('Format number', () => {
  it('loads and displays greeting', () => {
    const result: Array<TItemTableResponse> = Table.dataHandler({
      items: mockRequestRunResult,
      negociate: jest.fn(),
    });

    expect(result).toHaveLength(3);
    const firstItem = result[0];
    expect(firstItem.negociate).toBeTruthy();
    expect(firstItem.formattedAnbima).toEqual('1,0000%');
    expect(firstItem.formattedDuration).toEqual('1,00');
    expect(firstItem.formattedDate).toEqual('Ago.2022');
    expect(firstItem.isFavorite).toBeFalsy();
    expect(firstItem.fav).toBeDefined();
    expect(firstItem.formattedRemuneration).toEqual('IPCA+ 3.3700%');
    expect(firstItem.negociate).toBeDefined();
    expect(firstItem.formattedEmitter).toBeDefined();
    const secondItem = result[1];
    expect(secondItem.negociate).toBeTruthy();
    expect(secondItem.formattedAnbima).toEqual('0%');
    expect(secondItem.formattedDuration).toEqual('0');
    expect(secondItem.formattedDate).toEqual('Ago.2022');
    expect(secondItem.isFavorite).toBeFalsy();
    expect(secondItem.fav).toBeDefined();
    expect(secondItem.formattedRemuneration).toEqual('IPCA+ 0.0000%');
    expect(secondItem.negociate).toBeDefined();
    expect(secondItem.formattedEmitter).toBeDefined();
    const thirdItem = result[2];
    expect(thirdItem.negociate).toBeTruthy();
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
