import Number from '..';

describe('Format number', () => {
  it('should create formatNumber as specified', () => {
    expect(Number.formatNumber(10000, 2)).toEqual('10.000,00');
    // expect(Number.formatNumber(999999.9999, 4)).toEqual('999.999,9999');
    // TO DO Lidar com essa exceção
    expect(Number.formatNumber(10000, 0)).toEqual('10.000');
    expect(Number.formatNumber(10000)).toEqual('10.000,00');
    expect(Number.formatNumber(10000.1, 3)).toEqual('10.000,100');
    expect(Number.formatNumber(-10000.1, 3)).toEqual('-10.000,100');
  });

  it('should create formatAbbreviationNumber as specified', () => {
    expect(Number.formatAbbreviationNumber(10000, 2)).toEqual('10 K');
    expect(Number.formatAbbreviationNumber(100, 2)).toEqual('100.00');
    expect(Number.formatAbbreviationNumber(100, 3)).toEqual('100.000');
    expect(Number.formatAbbreviationNumber(1000000, 2)).toEqual('1.00 M');
    expect(Number.formatAbbreviationNumber(1000000000, 2)).toEqual('1.00 B');
  });
});
