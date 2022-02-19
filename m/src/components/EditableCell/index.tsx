import React, {
  useEffect, useState, useRef, memo,
} from 'react';
import NumberFormat from 'react-number-format';
import useOutside from '../../hooks/useOutside';
import { TObjectMapData } from '../../typing/table';
import { convertStringToNumber } from '../../utils/number';
import useDebounce from '../../hooks/useDebounce';
import CustomInput from './customInput';

import {
  Wrapper, EmptyValue, Tooltip,
} from './Styles';

type TEditableCell = {
  value: number | string | undefined;
  decimal: number;
  suffix: string | undefined;
  isSelf: boolean;
  isSelected: boolean;
  countedSelectedSameLine: number;
  name: 'bid' | 'offer';
  fieldName: string;
  setSelectedLine: (name: 'bid' | 'offer') => void;
  selectedNameLine: string;
  onKeyUp: (e: any, name: string, fieldName: string, typeName: string, row: TObjectMapData) => void;
  // eslint-disable-next-line react/require-default-props
  onChange?: (value: number | null) => void;
  rowData: TObjectMapData
  // eslint-disable-next-line react/no-unused-prop-types
  allowNegative: boolean | undefined;
  index: number;
  hasCurrentFocus: boolean;
  ticker: string;
}

const EditableCell = ({
  value,
  decimal,
  suffix,
  onChange,
  isSelf,
  isSelected = false,
  countedSelectedSameLine,
  name,
  fieldName,
  setSelectedLine,
  selectedNameLine,
  onKeyUp,
  rowData,
  index,
  hasCurrentFocus,
  allowNegative,
  ticker,
}: TEditableCell) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [initialValue, setInitialValue] = useState<number | string>();
  const [currentValue, setCurrentValue] = useState<number | string>();
  const [currentSelection, setCurrentSelection] = useState<boolean>(false);
  const [openTooltip, setOpenTooltip] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [hasWarning, setHasWarning] = useState<boolean>(false);
  const [messageFeedback, setMessageFeedBack] = useState<string | null>(null);

  const wrapperRef: any = useRef(null);
  const inputRef: any = useRef(null);
  const tooltipRef: any = useRef(null);

  const getFeedBack = (scopeRowData: TObjectMapData) => {
    const {
      type, message, fieldsError, localizationMessage,
    } = scopeRowData;
    const hasFeedBackFromField = fieldsError.includes(name + fieldName);
    switch (type) {
      case 'error':
        if (hasFeedBackFromField) {
          setHasError(true);
          setMessageFeedBack(message);
          setOpenTooltip(true);
        }
        break;
      case 'warn':
        if (localizationMessage && localizationMessage.includes(name + fieldName)) {
          setHasWarning(true);
          setMessageFeedBack(message);
          setOpenTooltip(true);
          setTimeout(() => {
            setHasWarning(false);
            setOpenTooltip(false);
            setMessageFeedBack('');
          }, 3000);
        }
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    setInitialValue(value);
    setCurrentValue(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const resetKeys = (isEventOnKeyUp?: boolean) => {
    setCurrentValue(initialValue);
    setCurrentSelection(false);
    if (!initialValue && !isEventOnKeyUp) {
      setIsVisible(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  useOutside(inputRef).listen(() => {
    if (currentSelection) {
      resetKeys();
    }
  });

  useOutside(tooltipRef).listen(() => {
    setHasError(false);
    setMessageFeedBack(null);
  });

  const setSelectedItem = () => {
    setCurrentSelection(true);
    inputRef.current.select();
    setSelectedLine(name);
    if (!isSelf) {
      setCurrentValue('');
    }
  };

  useEffect(() => {
    if (isSelected && currentSelection) {
      inputRef.current.select();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSelected, countedSelectedSameLine]);

  useEffect(() => {
    if (rowData) {
      getFeedBack(rowData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowData]);

  const setEnabledInput = () => {
    setIsVisible(true);
    setTimeout(() => {
      setCurrentSelection(true);
      inputRef.current.click();
    });
  };

  useEffect(() => {
    if (hasCurrentFocus) {
      if (inputRef.current) {
        inputRef.current.focus();
        inputRef.current.value = '';
      } else {
        Promise.all([
          setEnabledInput(),
        ]).then(() => {
          inputRef.current.focus();
          inputRef.current.value = '';
        });
      }
    }
  }, [hasCurrentFocus]);

  return (
    <Wrapper ref={wrapperRef}>
      {openTooltip && messageFeedback && (
        <Tooltip ref={tooltipRef} index={index} hasError={hasError} hasWarning={hasWarning}>
          {messageFeedback}
        </Tooltip>
      )}
      {
        value || isVisible ? (
          <NumberFormat
            data-testid={`${name}-${fieldName}-${ticker}`}
            className={`number-format number-format-${name}-${fieldName}`}
            displayType="input"
            thousandSeparator="."
            decimalSeparator=","
            fixedDecimalScale
            decimalScale={decimal}
            prefix=""
            suffix={suffix}
            value={currentValue}
            onChange={(e: any) => {
              useDebounce.dispatch(() => {
                if (onChange) {
                  const curValue = convertStringToNumber(e?.target?.value);
                  onChange(curValue);
                }
              });
            }}
            customInput={(props: any) => (
              <CustomInput
                name={name}
                inputRef={inputRef}
                fieldName={fieldName}
                resetKeys={resetKeys}
                handlerKeyUp={onKeyUp}
                hasError={hasError}
                selectedNameLine={selectedNameLine}
                allowNegative={allowNegative}
                onClick={setSelectedItem}
                onBlur={() => resetKeys()}
                onMouseUp={() => resetKeys()}
                rowData={rowData}
                isSelf={isSelf}
                {...props}
              />
            )}
          />
        ) : (
          <EmptyValue
            isSelf={isSelf}
            onClick={() => {
              setEnabledInput();
            }}
          >
            <span>-</span>
          </EmptyValue>
        )
      }
    </Wrapper>
  );
};
const areEqual = (prevProps: any, nextProps: any) => (
  prevProps.value === nextProps.value
  && prevProps.isSelf === nextProps.isSelf
  && prevProps.isSelected === nextProps.isSelected
  && prevProps.countedSelectedSameLine === nextProps.countedSelectedSameLine
  && prevProps.selectedNameLine === nextProps.selectedNameLine
  && prevProps.rowData?.updatedFields === nextProps.rowData?.updatedFields
  && prevProps.rowData?.fieldsError === nextProps.rowData?.fieldsError
  && prevProps.rowData?.localizationFocus === nextProps.rowData?.localizationFocus
  && prevProps.rowData?.localizationMessage === nextProps.rowData?.localizationMessage
  && prevProps.rowData?.message === nextProps.rowData?.message
  && prevProps.rowData?.type === nextProps.rowData?.type
  && prevProps.index === nextProps.index
  && prevProps.hasCurrentFocus === nextProps.hasCurrentFocus);

export default memo(EditableCell, areEqual);
