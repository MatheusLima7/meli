import { render } from '@testing-library/react';
// eslint-disable-next-line import/no-unresolved
import { Simulate } from 'react-dom/test-utils';
import React, { useRef } from 'react';
import useOutside from '..';

const mockActionOutside = jest.fn();

const ReactTestComponent = ({ dataTestid }) => {
  const ref = useRef();
  useOutside(ref).listen(() => mockActionOutside(false));
  return (
    <div ref={ref} data-testid={dataTestid}>Olá mundo!</div>
  );
};

describe('useOutside', async () => {
  const mockRef: any = {
    current: { contains: jest.fn() },
  };

  const makeComponentStub = (initialState: any, props: any) => (
    render(<ReactTestComponent {...props} />)
  );

  it('the useOutside method should only dispatch the function when specified', async () => {
    const { getByTestId } = makeComponentStub(null, {
      dataTestid: 'test-element',
    });
    const testComponent = getByTestId('test-element');
    expect(testComponent).toBeDefined();

    expect(mockActionOutside).toBeCalledTimes(0);
    expect(mockRef.current.contains).toBeCalledTimes(0);

    Simulate.mouseDown(testComponent);
  });
});
