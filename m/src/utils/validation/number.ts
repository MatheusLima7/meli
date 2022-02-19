const EQUALITY_TOLERANCE = 0.01;

type TValidateItem = {
  validate: any;
};
export class NumberValidation {
  private isEqual = (value: number, basisComparison: number) => (
    Math.abs(basisComparison - value) < EQUALITY_TOLERANCE
  );

  validateCrossAmount = (
    financial: number,
    quantity: number,
    maxFinancial?: number,
    maxQuantity?: number,
  ): null | string => {
    if (!financial && !quantity) {
      return 'Você precisa preencher um dos campos acima para comprar';
    }
    if (
      maxQuantity
      && maxFinancial
      && financial > maxFinancial
      && quantity > maxQuantity
      && !this.isEqual(financial, maxFinancial)
    ) {
      return 'Os valores solicitados são superiores aos disponíveis';
    }

    return null;
  }

  validateNumber = (value: number, maxValue: number): null | string => {
    if (!value) {
      return 'Você precisa preencher um dos campos acima para comprar';
    }
    if (maxValue && value > maxValue) {
      if (this.isEqual(value, maxValue)) return null;
      return 'O valor solicitado é superior ao disponível';
    }
    return null;
  }

  NUMBER: TValidateItem = {
    validate: this.validateNumber,
  };

  CROSS_AMOUNT: TValidateItem = {
    validate: this.validateCrossAmount,
  };
}

export const validation = new NumberValidation();
