import React from 'react';
import { render } from '@testing-library/react';

import DEFAULT_COLUMNS from '../../../mocks/columns';
import FilterTable from '..';

const mockFinally = jest.fn();
const mockProviderValue: any = {
  connection: new (class {
    invoke = () => ({
      then: () => ({
        catch: () => ({
          finally: mockFinally,
        }),
      }),
    });

    on = jest.fn();
  })(),
  connected: true,
};

const propsFilterTable: any = {
  isOpennedBlottler: false,
  selectedItemRun: null,
  context: mockProviderValue,
  data: [],
};

const makeComponentStub = (_: any, props: any) => {
  const {
    isOpennedBlottler, data, selectedItemRun, context,
  } = props;
  return render(
    <FilterTable
      isOpennedBlottler={isOpennedBlottler}
      data={data}
      selectedItemRun={selectedItemRun}
      context={context}
      defaultColumns={DEFAULT_COLUMNS}
    />,
  );
};

describe('FilterTable Component', () => {
  describe('Render', () => {
    it('should render FilterTable', () => {
      expect(makeComponentStub(null, propsFilterTable)).toBeDefined();
    });
  });
});
