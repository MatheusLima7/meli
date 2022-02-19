import MyStorage from '..';

describe('MyStorage', () => {
  let windowSpy: any;

  beforeEach(() => {
    windowSpy = jest.spyOn(window, 'window', 'get');
  });

  afterEach(() => {
    windowSpy.mockRestore();
  });

  it('method get should behave as expected', () => {
    const mockLocalStorage = {
      getItem: jest.fn(),
    };

    windowSpy.mockImplementation(() => ({
      localStorage: mockLocalStorage,
    }));

    expect(mockLocalStorage.getItem).toBeCalledTimes(0);
    MyStorage('localStorage').get('key');
    expect(mockLocalStorage.getItem).toBeCalledTimes(1);
    expect(mockLocalStorage.getItem).toBeCalledWith('key');
  });

  it('method set should behave as expected', () => {
    const mockLocalStorage = {
      setItem: jest.fn(),
    };

    windowSpy.mockImplementation(() => ({
      localStorage: mockLocalStorage,
    }));

    expect(mockLocalStorage.setItem).toBeCalledTimes(0);
    MyStorage('localStorage').set('key', 'value');
    expect(mockLocalStorage.setItem).toBeCalledTimes(1);
    expect(mockLocalStorage.setItem).toBeCalledWith('key', 'value');
  });

  it('method set should behave as expected', () => {
    const mockLocalStorage = {
      removeItem: jest.fn(),
    };

    windowSpy.mockImplementation(() => ({
      localStorage: mockLocalStorage,
    }));

    expect(mockLocalStorage.removeItem).toBeCalledTimes(0);
    MyStorage('localStorage').remove('key');
    expect(mockLocalStorage.removeItem).toBeCalledTimes(1);
    expect(mockLocalStorage.removeItem).toBeCalledWith('key');
  });

  it('method set should behave as expected', () => {
    const mockLocalStorage = {
      clear: jest.fn(),
    };

    windowSpy.mockImplementation(() => ({
      localStorage: mockLocalStorage,
    }));

    expect(mockLocalStorage.clear).toBeCalledTimes(0);
    MyStorage('localStorage').clear();
    expect(mockLocalStorage.clear).toBeCalledTimes(1);
  });
});
