import useDebounce from '..';

describe('UseDebounce', async () => {
  it('the useDebounce method should only dispatch the function when specified', async () => {
    const mockFn = jest.fn();
    useDebounce.dispatch(() => mockFn('property_1', 'value_1'), 100);
    expect(useDebounce.isWaiting).toBeTruthy();
    expect(mockFn).toBeCalledTimes(0);
  });
});
