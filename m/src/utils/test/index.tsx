/* istanbul ignore file */

import React, { ReactElement } from 'react';
import { render, RenderOptions, RenderResult } from '@testing-library/react';

const customRender = (
  ui: ReactElement,
  options: RenderOptions,
): RenderResult => (
  render(ui, {
    wrapper: () => (
      <>
        {ui}
      </>
    ),
    ...options,
  })
);

const CustomHook = ({ callback }: any) => {
  callback();
  return null;
};

export const renderHook = (
  callback: () => void,
) => {
  render(<CustomHook callback={callback} />);
};

export * from '@testing-library/react';
export { customRender as render };
