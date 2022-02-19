import React from 'react';
import { render } from '@testing-library/react';
import FilterOptions from '..';

const propsFavoriteProps: any = {
  columns: [
    {
      Header: 'Teste',
      value: true,
    },
  ],
  setSearch: jest.fn(),
  editColumns: jest.fn(),
};

const makeComponentStub = (_: any, props: any) => {
  const { columns, setSearch, editColumns } = props;
  return render(
    <FilterOptions
      columns={columns}
      setSearch={setSearch}
      editColumns={editColumns}
    />,
  );
};

describe('FilterOptions Component', () => {
  describe('Render', () => {
    it('should render FilterOptions', () => {
      expect(makeComponentStub(null, propsFavoriteProps)).toBeDefined();
    });
  });
});
