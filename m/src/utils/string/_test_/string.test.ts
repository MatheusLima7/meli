import String from '..';

describe('Format string', () => {
  it('should create capitalizeWord as specified', () => {
    expect(String.capitalizeWord('teste')).toEqual('TESTE');
    expect(String.capitalizeWord('TESTE')).toEqual('TESTE');
    expect(String.capitalizeWord('TESTE DOIS')).toEqual('TESTE DOIS');
    expect(String.capitalizeWord('teste dois')).toEqual('TESTE DOIS');
  });
});
