import { TObjectMapData } from '../../typing/table';

const genericFeedback = ({ type, localizationFocus }: Partial<TObjectMapData>) => ({
  fieldsError: [],
  localizationMessage: null,
  message: null,
  type,
  localizationFocus,
});

const quantityValidate = (
  newValue: number,
  rowData: TObjectMapData,
  negotiationType: 'bid' | 'offer',
) => {
  if (newValue <= 0) {
    return {
      fieldsError: [`${negotiationType}Quantity`],
      localizationMessage: `${negotiationType}Quantity`,
      message: 'Obrigatório preencher a quantidade',
      type: 'error',
      localizationFocus: null,
    };
  }

  const checkedSuccess = !!rowData?.updatedFields.includes(`${negotiationType}Fee`);
  if (checkedSuccess) return genericFeedback({ type: 'succes' });
  return genericFeedback({ type: 'focus', localizationFocus: `${negotiationType}Fee` });
};

const feeValidate = (
  newValue: number | string,
  rowData: any,
  negotiationType: 'bid' | 'offer',
) => {
  const isBid = negotiationType === 'bid';

  if (newValue <= '') {
    return {
      fieldsError: [`${negotiationType}Fee`],
      localizationMessage: `${negotiationType}Fee`,
      message: `Obrigatório preencher o ${negotiationType}`,
      type: 'error',
    };
  }

  const checkedSuccess = !!(rowData?.updatedFields.includes(`${negotiationType}Quantity`));
  const conditional = isBid ? (newValue < rowData?.offerFee)
    : (rowData?.bidFee < newValue);
  if (conditional) {
    return {
      fieldsError: [],
      localizationMessage: `${negotiationType}Fee`,
      message: `
          Atenção: Taxa ${isBid ? 'inferior' : 'superior'} ao
          ${(isBid ? 'offer' : 'bid')}
        `,
      type: 'warn',
    };
  }

  if (checkedSuccess) {
    return genericFeedback({ type: 'succes' });
  }

  return genericFeedback({ type: 'focus', localizationFocus: `${negotiationType}Quantity` });
};

const negotiationValidate = (
  newValue: number,
  rowData: TObjectMapData,
  type: 'quantity' | 'fee',
  negotiationType: 'bid' | 'offer',
) => {
  if (type === 'quantity') return quantityValidate(newValue, rowData, negotiationType);
  return feeValidate(newValue, rowData, negotiationType);
};

export default {
  negotiationValidate,
};
