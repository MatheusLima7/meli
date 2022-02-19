import Parameters from '..';

describe('Parameters string', () => {
  it('should create getURLStringParameters method as specified', () => {
    expect(Parameters.getURLStringParameters('par1', [])).toEqual('');
    expect(Parameters.getURLStringParameters('par1', ['1'])).toEqual('par1=1&');
    expect(Parameters.getURLStringParameters('par1', ['1', '3'])).toEqual(
      'par1=1&par1=3&',
    );
    expect(
      Parameters.getURLStringParameters('par1', ['1', '2', 'string', '4']),
    ).toEqual('par1=1&par1=2&par1=string&par1=4&');
  });
});
