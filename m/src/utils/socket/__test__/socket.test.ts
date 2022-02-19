import handler from '..';
import { mockRequestRunResult } from '../../../mocks/runResult';

const createInitialBase = (propDate?: string) => handler.handlerWSData({
  socketData: mockRequestRunResult,
  customData: [],
  propId: 'id',
  propDate,
});

describe('Manage local state data', () => {
  it('initial charge', () => {
    const result = createInitialBase();
    expect(result).toEqual(mockRequestRunResult);
  });

  it('updating an existing item', () => {
    let result = createInitialBase();
    const updatedData = {
      ...mockRequestRunResult[2],
      offer: {
        fee: 5.02,
        finalFee: 5.03,
        quantity: 100001.0,
        finantialVolume: 106189326.1826430,
        unitPrice: 1061.882643,
        liquidation: 1,
      },
    };
    result = handler.handlerWSData({
      customData: result,
      socketData: [updatedData],
      propId: 'id',
    });

    expect(result).toHaveLength(3);
    expect(result[2]).toEqual(updatedData);
  });

  it('do not update new with outdated base', () => {
    let result = createInitialBase();
    let updatedData = {
      ...mockRequestRunResult[2],
      offer: {
        fee: 5.02,
        finalFee: 5.03,
        quantity: 100001.0,
        finantialVolume: 106189326.1826430,
        unitPrice: 1061.882643,
        liquidation: 1,
      },
    };
    result = handler.handlerWSData({
      customData: result,
      socketData: [updatedData],
      propDate: 'data',
      propId: 'id',
    });

    expect(result).toEqual(mockRequestRunResult);
    expect(result[2]).not.toEqual(updatedData);

    updatedData = {
      ...mockRequestRunResult[2],
      data: '2020-07-15T00:00:00',
      offer: {
        fee: 5.02,
        finalFee: 5.03,
        quantity: 100001.0,
        finantialVolume: 106189326.1826430,
        unitPrice: 1061.882643,
        liquidation: 1,
      },
    };
    result = handler.handlerWSData({
      customData: result,
      socketData: [updatedData],
      propDate: 'data',
      propId: 'id',
    });

    expect(result).toEqual(mockRequestRunResult);
    expect(result[2]).not.toEqual(updatedData);

    updatedData = {
      ...mockRequestRunResult[2],
      data: '2029-07-16T00:00:00',
      offer: {
        fee: 5.02,
        finalFee: 5.03,
        quantity: 100001.0,
        finantialVolume: 106189326.1826430,
        unitPrice: 1061.882643,
        liquidation: 1,
      },
    };
    result = handler.handlerWSData({
      customData: result,
      socketData: [updatedData],
      propDate: 'data',
      propId: 'id',
    });

    expect(result).toHaveLength(3);
    expect(result[2]).toEqual(updatedData);
  });
});
