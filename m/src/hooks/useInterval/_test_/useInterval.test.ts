import { renderHook } from '@testing-library/react-hooks';
import * as React from 'react';
import useInterval from '..';

describe('UseInterval', async () => {
  const mockCallBack = jest.fn();
  const useRefMock = jest.spyOn(React, 'useRef');
  const mockCurrent: any = {
    current: mockCallBack,
  };

  beforeEach(() => {
    useRefMock.mockReturnValue(mockCurrent);
  });

  it('the useInterval method should only dispatch the function when specified', async () => {
    renderHook(() => useInterval(mockCallBack, 100));
    expect(mockCallBack).toBeCalledTimes(0);
  });
});
