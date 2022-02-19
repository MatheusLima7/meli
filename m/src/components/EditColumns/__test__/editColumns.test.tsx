import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import EditColumns, { TEditColumns } from '..';

const propsEditColumns: TEditColumns = {
  columns: [
    {
      Header: 'Teste',
      value: 'true',
      accessor: 'teste',
    },
  ],
  editColumns: jest.fn(),
};

const makeComponentStub = (initialState: any, props: TEditColumns) => {
  const { editColumns, columns } = props;
  return render(<EditColumns editColumns={editColumns} columns={columns} />);
};

describe('EditColumns Component', () => {
  describe('Render', () => {
    it('should render EditColumns', () => {
      expect(makeComponentStub(null, propsEditColumns)).toBeDefined();
    });
  });

  describe('Change Columns', () => {
    it('should called the function when click in checkbox and save', async () => {
      const mockFn = jest.fn();
      const wrapper = makeComponentStub(null, {
        columns: [
          {
            Header: 'Teste',
            value: 'true',
            accessor: 'teste',
          },
        ],
        editColumns: mockFn,
      });

      const checkbox = await wrapper.findByTestId('checkbox-teste');
      fireEvent.click(checkbox);

      expect(mockFn).toBeCalled();
    });
  });
});
