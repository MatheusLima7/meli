import { BsArrowUp, BsArrowDown, BsArrowDownUp } from 'react-icons/bs';
import React from 'react';

interface ISortColumn {
  sort: 'asc' | 'desc' | null;
  isSorted: boolean;
}

const SortColumn = ({ sort, isSorted }: ISortColumn) => {
  if (!isSorted) return null;
  if (sort === 'asc') {
    return (<BsArrowUp />);
  }
  if (sort === 'desc') {
    return (<BsArrowDown />);
  }
  return (<BsArrowDownUp />);
};

export default SortColumn;
