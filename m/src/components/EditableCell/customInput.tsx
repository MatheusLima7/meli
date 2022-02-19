import React from 'react';
import { StyleInput } from './Styles';

import { TObjectMapData } from '../../typing/table';

const specialAllowedKeys = ['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown', 'Backspace', 'Delete', '-'];
// eslint-disable-next-line no-useless-escape
const allowedKeys = (key: string) => !!key.match(/[\d\.\,]+/g);

export type TCustomInput = {
  selectedNameLine?: string;
  handlerKeyUp: (e: any,
    name: string,
    fieldName: string,
    typeName: string,
    row: TObjectMapData,
  ) => void;
  fieldName: string;
  resetKeys: (isEventOnKeyUp?: boolean) => void;
  rowData: TObjectMapData;
  hasError?: boolean;
  isSelf: boolean;
  inputRef: any;
  name?: string;
  testid?: string
}

const CustomInput = (props: TCustomInput) => {
  const {
    selectedNameLine,
    handlerKeyUp,
    fieldName,
    resetKeys,
    hasError,
    inputRef,
    rowData,
    name,
    testid,
  } = props;

  return (
    <StyleInput
      data-testid={testid}
      hasError={hasError}
      selectedNameLine={selectedNameLine}
      name={name}
      ref={inputRef}
      onKeyUp={(e: any) => {
        if (e.key === 'Enter') {
          handlerKeyUp(
            e,
            name + fieldName,
            fieldName.toLowerCase(),
            name || '', rowData,
          );
        }

        if (
          !allowedKeys(e.key)
          && !specialAllowedKeys.includes(e.key)
        ) {
          resetKeys(true);
        }
      }}
      {...props}
    />
  );
};

export default CustomInput;
