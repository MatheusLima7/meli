import React, { useState } from 'react';

export type TCellModifyingMap = {
  [key: string]: number
}

export type TSeletingItem = {
  prop: string;
  value: string;
  backgroundColor?: string;
  name?: string;
}

export type TTable = {
  cells: TCellModifyingMap;
  setCells: React.Dispatch<React.SetStateAction<TCellModifyingMap>>;
  selectingItem: TSeletingItem | null;
  setSelectingItem: React.Dispatch<React.SetStateAction<TSeletingItem | null>>;
}

export const TableContext = React
  .createContext<TTable | null>(null);

const TableProvider = ({ children }: { children: React.ReactChild }) => {
  const [cells, setCells] = useState<TCellModifyingMap>({});
  const [selectingItem, setSelectingItem] = useState<TSeletingItem | null>(null);

  return (
    <TableContext.Provider value={{
      cells, setCells, selectingItem, setSelectingItem,
    }}
    >
      {children}
    </TableContext.Provider>
  );
};

export default TableProvider;
