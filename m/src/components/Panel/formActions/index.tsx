import { InputNumbers, Button } from 'xpinc-tools';
import React, { useState } from 'react';

import { validation } from '../../../utils/validation/number';
import { Actions } from './Styles';

export type TErrorMessage = {
  message: string;
  error: boolean;
};

export type TSubmitProps = {
  financial: number | undefined,
  quantity: number | undefined,
  ticker: string
};

export type TValidateForm = {
  financial: TErrorMessage;
  quantity: TErrorMessage;
};

export type TFormActions = {
  ticker: string,
  maxQuantity: number,
  maxVolume: number,
  button: {
    action: (values: any) => void,
    loading?: boolean,
    color: string,
    title: string,
  },
  testid: string,
  rate: number,
};

const FormActions = ({
  maxQuantity,
  maxVolume,
  button,
  ticker,
  testid,
  rate,
}: TFormActions) => {
  const [financialValue, setFinancialValue] = useState<number | undefined>();
  const [quantityValue, setQuantityValue] = useState<number | undefined>();
  const [inputFocus, setInputFocus] = useState(false);

  const initialValidateForm: TValidateForm = {
    financial: { error: false, message: '' },
    quantity: { error: false, message: '' },
  };

  const [validateForm, setValidateForm] = useState<TValidateForm>({
    financial: { error: false, message: '' },
    quantity: { error: false, message: '' },
  });

  const handlerValidateForm = () => {
    const crossMessageError = validation.CROSS_AMOUNT.validate(
      financialValue,
      quantityValue,
      maxQuantity,
      maxVolume,
    );
    const financialMessageError = validation.NUMBER.validate(
      financialValue,
      maxVolume,
    );
    const quantityMessageError = validation.NUMBER.validate(
      quantityValue,
      maxQuantity,
    );
    return {
      financial: {
        error: !!crossMessageError || !!financialMessageError,
        message: crossMessageError ? null : financialMessageError,
      },
      quantity: {
        error: !!quantityMessageError,
        message: crossMessageError || quantityMessageError,
      },
      valid:
        !crossMessageError
        && !financialMessageError
        && !quantityMessageError,
    };
  };

  const onSubmit = () => {
    const validateProps = handlerValidateForm();
    setValidateForm({
      financial: validateProps.financial,
      quantity: validateProps.quantity,
    });

    if (validateProps.valid) {
      const response: TSubmitProps = {
        financial: financialValue,
        quantity: quantityValue,
        ticker,
      };
      if (button.action) {
        button.action(response);
      }
    }
  };

  const handleFinancialChange = (value: number | undefined) => {
    const floatValue = value || 0.0;
    setFinancialValue(floatValue);
    setQuantityValue(Math.floor(rate ? floatValue / rate : 0));
  };

  const treatFinancialValue = () => {
    setFinancialValue(quantityValue && rate ? quantityValue * rate : 0);
  };

  const handleQuantityChange = (value: number | undefined) => {
    const intValue = value || 0;
    setQuantityValue(intValue);
    setFinancialValue(rate ? rate * intValue : 0.0);
  };

  const onClick = (field: 'financial' | 'quantity') => {
    if (!validateForm.financial.error && !validateForm.quantity.error) {
      const newValidate = {
        error: false,
        message:
          field === 'financial'
            ? 'Ao alterar o FIN, a QTD é alterada automaticamente'
            : 'Ao alterar a QTD, o FIN é alterado automaticamente',
      };

      setValidateForm({
        ...initialValidateForm,
        quantity: newValidate,
      });
    }
  };

  return (
    <Actions>
      <InputNumbers
        testid={`${testid}-financial`}
        isEnabled
        field="financial"
        placeholder="R$ 0,00"
        changingForm={inputFocus}
        setInputFocus={setInputFocus}
        onChange={handleFinancialChange}
        value={
          !financialValue || !Number(financialValue)
            ? ''
            : Number(financialValue) * 100
        }
        label="FIN"
        maskProperties={{
          decimalScale: 2,
          prefix: 'R$ ',
        }}
        handlerBlur={treatFinancialValue}
        onClick={() => onClick('financial')}
        errorMessage={validateForm.financial.message}
        error={!!validateForm.financial.error}
      />
      <InputNumbers
        testid={`${testid}-quantity`}
        isEnabled
        field="quantity"
        placeholder="0"
        value={quantityValue}
        changingForm={inputFocus}
        setInputFocus={setInputFocus}
        maskProperties={{
          decimalScale: 0,
        }}
        errorMessage={validateForm.quantity.message}
        onClick={() => onClick('quantity')}
        error={!!validateForm.quantity.error}
        onChange={handleQuantityChange}
        label="QTD"
      />
      <Button
        loading={button.loading}
        data-testid="test-submit"
        color={button.color}
        onClick={onSubmit}
      >
        {button.title}
      </Button>
    </Actions>
  );
};

export default FormActions;
