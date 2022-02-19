import React, { useState, useRef, useEffect } from 'react';

import ResizeColumns from '../ResizeColumns';
import SortColumn from '../SortColumn';
import { Th, RowCell, SortButton } from './Styles';

export type TOrder = 'asc' | 'desc' | undefined
interface IHeaderCell {
  borderStyle: { color: string, types: Array<string> };
  onChangeSize: (size: number) => void;
  order: (newState: TOrder) => void;
  children: React.ReactChild;
  defaultSort: TOrder | null;
  defaultWidth: number;
  isSorted: boolean;
  minWidth: number;
  hidden: boolean;
}

const HeaderCell = ({
  onChangeSize,
  defaultWidth,
  borderStyle,
  defaultSort,
  minWidth,
  children,
  isSorted,
  hidden,
  order,
}: IHeaderCell) => {
  const [sort, setSort] = useState<TOrder | null>(defaultSort);
  const ref: any = useRef();

  const getNewSort = (newSort: TOrder | null) => {
    if (newSort === 'asc') return 'desc';
    if (newSort === 'desc') return undefined;
    return 'asc';
  };

  const changeOrder = () => {
    const newState: TOrder = getNewSort(sort);
    if (order) {
      setSort(newState);
      order(newState);
    }
  };

  useEffect(() => setSort(defaultSort), [defaultSort]);

  useEffect(() => {
    if (ref && ref.current) {
      ref.current.style.minWidth = `${defaultWidth}px`;
    }
  }, [ref, defaultWidth]);

  const handlerChange = (width: number) => {
    if (ref && ref.current) {
      ref.current.style.minWidth = `${width}px`;
    }
  };

  return (
    <Th
      className={borderStyle?.types?.join(' ')}
      borderColor={borderStyle?.color}
      style={{
        borderBottom: '1px solid #10121A',
      }}
      hidden={hidden}
      width={defaultWidth}
      scope="col"
      ref={ref}
    >
      <RowCell onClick={changeOrder}>
        <div>{children}</div>
        <SortButton
          className="sort-icon"
        >
          <SortColumn isSorted={!!isSorted} sort={sort || null} />
        </SortButton>
      </RowCell>
      <ResizeColumns
        handlerSubmit={onChangeSize}
        handlerChange={handlerChange}
        defaultWidth={defaultWidth}
        minWidth={minWidth || 0}
      />
    </Th>
  );
};

export default HeaderCell;
