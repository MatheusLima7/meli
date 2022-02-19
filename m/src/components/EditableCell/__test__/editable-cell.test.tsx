import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { TEditableCell } from '../../../typing/table';
import EditableCell from '..';

const mockRowData = {
  bidFee: 1.12,
  bidQuantity: 10000,
  bidVolume: null,
  bidPU: 0,
  offerFee: 2.3,
  offerQuantity: 20000,
  offerVolume: null,
  offerPU: 0,
  updatedFields: [],
  fieldsError: [],
  localizationFocus: null,
  localizationMessage: null,
  message: null,
  type: null,

};

const propsEditableCellComponent: TEditableCell = {
  value: 10,
  decimal: 0,
  suffix: undefined,
  isSelf: false,
  isSelected: false,
  countedSelectedSameLine: 0,
  name: 'bid',
  fieldName: 'Quantity',
  setSelectedLine: jest.fn(),
  selectedNameLine: 'bid',
  onKeyUp: jest.fn(),
  rowData: mockRowData,
  allowNegative: undefined,
  index: 0,
  hasCurrentFocus: false,
  testid: 'bid-quantity',
};

const makeComponentStub = (
  _: any,
  props: TEditableCell = propsEditableCellComponent,
) => (
  render(<EditableCell {...props} />)
);

describe('EditableCell Component', () => {
  describe('Render', () => {
    it('should render button', () => {
      expect(makeComponentStub(null, propsEditableCellComponent)).toBeDefined();
    });
    it.skip('must focus component when click event is fired', async () => {
      const { getByTestId } = makeComponentStub(null, {
        ...propsEditableCellComponent,
      });
      const editableComponent = await getByTestId('bid-quantity');
      await fireEvent.click(editableComponent);
      expect(editableComponent).toHaveFocus();
    });
  });
});
