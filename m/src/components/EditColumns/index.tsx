import React, { useState, useRef } from 'react';
import { SomaIcon } from '@soma/react';
import {
  Container,
  EditIcon,
  List,
  Item,
} from './Styles';
import Checkbox from '../Checkbox';
import useOutside from '../../hooks/useOutside';
import utilGoogleAnalitycs from '../../utils/ga';

type TColumns = {
  Header: any;
  sticky?: string;
  accessor?: string;
  columns?: any;
  value: string;
  hide?: boolean;
  isEmptyColumn?: boolean;
};

export type TEditColumns = {
  columns: TColumns[];
  editColumns: (columns: TColumns[]) => void;
};

const EditColumns = ({ columns, editColumns }: TEditColumns) => {
  const [isEnabled, setIsEnabled] = useState<boolean>(false);
  const ref = useRef();

  useOutside(ref).listen(() => setIsEnabled(false));

  const setColumnValue = (columnName: string, columnValue: string) => {
    const nextCols = columns.map((item) => {
      if (item.Header === columnValue) {
        utilGoogleAnalitycs.setGA(
          'event',
          'Seleção de Colunas da Tabela RUN',
          `Coluna: ${columnValue} ${!item.hide ? 'Oculta' : 'Visível'}`,
        );
        return { ...item, hide: !item.hide };
      }
      return item;
    });

    editColumns(nextCols);
  };

  return (
    <Container ref={ref}>
      <EditIcon onClick={() => setIsEnabled(!isEnabled)}>
        <SomaIcon size="sm" icon="settings" color="#B7CBEC" />
      </EditIcon>
      <List isEnabled={isEnabled}>
        {columns.map((col, index) => {
          const column = col;
          column.value = column.Header;
          if (column.accessor === 'negociate'
            || column.accessor === 'fav'
            || column.isEmptyColumn
          ) return null;
          return (
            <Item key={`item-checkbox-${index.toString()}`}>
              <Checkbox
                testid={`checkbox-${column?.accessor}`}
                defaultChecked={!column?.hide}
                id={column?.accessor || index.toString()}
                label={column?.Header}
                onChange={setColumnValue}
                value={column?.value}
                name={column?.accessor || index.toString()}
              />
            </Item>
          );
        })}
      </List>
    </Container>
  );
};

export default EditColumns;
