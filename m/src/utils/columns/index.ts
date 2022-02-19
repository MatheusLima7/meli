/* eslint-disable no-param-reassign */
import { DICTIONARY_SIDE_TRANSACTION } from '../enum';
import { TColumns } from '../../typing/table';
import DEFAULT_COLUMNS from '../../mocks/columns';

const MAX_TRACTABLE_COLUMNS = 12;

const favoriteIndex = 0;
const actionsIndex = (DEFAULT_COLUMNS.length - 1);
const ACTIONS_COLUMNS = {
  Header: '',
};

const getStringVisibleColumns = (columns: TColumns[]) => {
  const savedColumns: string[] = [];
  columns.forEach((item: TColumns, index: number) => {
    if (!item.hide && index !== favoriteIndex && index !== actionsIndex) {
      savedColumns.push(item.Header);
    }
  });
  return savedColumns.join(', ');
};

const formatVisibleColumns = (columns: TColumns[], savedColumns?: string) => {
  const newColumns = columns.map((column: any) => {
    if (column.columns && column.columns.length) {
      return {
        ...column,
        columns: column.columns.map((subColumn: any) => ({
          ...subColumn,
          hide: column.hide,
        })),
      };
    }
    return column;
  });

  if (!savedColumns) return newColumns;
  newColumns.map((col: TColumns, index: number) => {
    const column = col;
    column.hide = true;
    if (
      (typeof column.Header === 'string' && savedColumns.indexOf(column.Header) !== -1)
      || (index === favoriteIndex || index === actionsIndex)
    ) {
      column.hide = false;
    }

    return column;
  });

  return columns;
};

const setColumnWidth = (
  ref: any, currentColumns: TColumns[], isBlotter: boolean, cached?: string | undefined,
) => {
  const filtered: TColumns[] = currentColumns;
  let storage: any = cached;

  if (storage) {
    storage = JSON.parse(storage);
  }

  if (ref?.current?.clientWidth) {
    const countGroupColumns = isBlotter ? 0 : (2 * filtered
      .filter(
        (item) => item.Header === DICTIONARY_SIDE_TRANSACTION[1]
          || item.Header === DICTIONARY_SIDE_TRANSACTION[2],
      ).length);
    const width = ref?.current?.clientWidth / (filtered.length + countGroupColumns);

    const columnOverflow = filtered.length > MAX_TRACTABLE_COLUMNS;

    filtered.forEach((obj: TColumns) => {
      if (
        obj.Header === DICTIONARY_SIDE_TRANSACTION[1]
        || obj.Header === DICTIONARY_SIDE_TRANSACTION[2]
      ) {
        if (obj.columns) {
          obj.columns.forEach((item: TColumns) => {
            if (item.Header !== ACTIONS_COLUMNS.Header) {
              if (!columnOverflow) {
                item.width = width;
              }
              if (storage && item.accessor && storage[item.accessor]) {
                item.width = storage[item.accessor];
              }
            }
          });
        }
      } else {
        if (!columnOverflow) {
          obj.width = width;
        }
        if (storage && obj.accessor && storage[obj.accessor]) {
          obj.width = storage[obj.accessor];
        }
      }
    });
  }

  return filtered;
};

export default {
  getStringVisibleColumns,
  formatVisibleColumns,
  setColumnWidth,
};
