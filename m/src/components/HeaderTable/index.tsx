import React from 'react';

import HeaderCell from './headerCell';
import { TSortBy } from '../../typing/table';

import { Thead, Tr, Th } from './Styles';

interface IHeader {
  asyncSortByFn: (sortBy: Array<{ id: string; desc: boolean }>) => void;
  setInfoResizing: (key: string, value: number) => void
  defaultSortByItem: TSortBy | null;
  columns: Array<any>;
}

const HeaderTable = ({
  defaultSortByItem,
  setInfoResizing,
  asyncSortByFn,
  columns,
}: IHeader) => {
  const prepareHeader: (column: any) => any = (column) => {
    const newColumn = column;
    if (column.columns && column.columns.length) {
      if (column.border) {
        newColumn.border = {
          ...column.border,
          types: ['border-left', 'border-right', 'border-top'],
        };
      }
    }
    return newColumn;
  };

  const prepareSubHeaderCells: (headersColumns: Array<any>) => Array<any> = () => {
    let row: Array<any> = [];

    columns.forEach((column) => {
      if (column.columns && column.columns.length) {
        const subColumns = column.columns;
        const borderStyle = {
          color: column?.border?.color,
        };
        subColumns[0].border = {
          ...borderStyle,
          types: ['border-left'],
        };
        subColumns[subColumns.length - 1].border = {
          ...borderStyle,
          types: ['border-right'],
        };
        row = row.concat(subColumns);
      } else {
        row.push(column);
      }
    });

    return row;
  };

  const getDefaultWidth = (minWidth: number, width: number) => (
    minWidth > width ? minWidth : width
  );

  const getDefaultSort = (sortByItem: TSortBy | null, id: string) => {
    if (!sortByItem || sortByItem.id !== id) return null;
    if (sortByItem.desc) return 'desc';
    return 'asc';
  };

  return (
    <Thead>
      <Tr>
        {columns.map((column, index) => {
          if (!column.columns || !column.columns.length) {
            // eslint-disable-next-line react/no-array-index-key
            return (<Th hidden={column.hide} key={`empty-cell-${index}`} scope="col" />);
          }
          const newColumn = prepareHeader(column);
          return (
            <Th
              className={`composite-column ${newColumn?.border?.types?.join(' ')}`}
              borderColor={newColumn?.border?.color}
              colSpan={newColumn?.columns.length}
              width={newColumn.width}
              key={newColumn.Header}
              hidden={column.hide}
              scope="col"
            >
              <span>
                {column.Header}
              </span>
            </Th>
          );
        })}
      </Tr>
      <Tr style={{ backgroundColor: 'rgb(31, 36, 51)' }}>
        {prepareSubHeaderCells(columns).map((column) => (
          !column.hide ? (
            <HeaderCell
              order={(sorting) => asyncSortByFn(sorting
                ? [{
                  desc: sorting === 'desc',
                  id: column.accessor,
                }] : [])}
              onChangeSize={(size) => {
                setInfoResizing(column.accessor, size);
              }}
              defaultWidth={getDefaultWidth(column.minWidth || 0, column.width)}
              defaultSort={getDefaultSort(defaultSortByItem, column.accessor)}
              borderStyle={column?.border}
              minWidth={column.minWidth}
              hidden={column.hide}
              key={column.accessor}
              isSorted
            >
              {column.Header}
            </HeaderCell>
          ) : null
        ))}
      </Tr>
    </Thead>
  );
};

export default HeaderTable;
