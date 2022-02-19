import React from 'react';
import NumberUtil from '../../utils/number';
import { Wrapper, Tooltip, Content } from './Styles';

export type TVolume = {
  value: number | null;
  loading?: boolean;
  isSelf?: boolean;
};

const getParams = (loading: boolean, value: number | null) => {
  if (loading) {
    return {
      tooltipValue: 'A sua ordem já está disponível ao mercado. Calculando o volume.',
      strValue: '....',
    };
  }

  if (!value && value !== 0) {
    return {
      tooltipValue: null,
      strValue: '-',
    };
  }

  return {
    tooltipValue: NumberUtil.formatNumber(value, 2)?.toString(),
    strValue: value < 1000 ? NumberUtil
      .formatNumber(value)?.toString() : NumberUtil.formatAbbreviationNumber(value)?.toString(),
  };
};

const Volume = ({
  loading,
  isSelf,
  value,
}: TVolume) => {
  const { tooltipValue, strValue } = getParams(!!loading, value);

  return (
    <Wrapper>
      {tooltipValue && <Tooltip>{tooltipValue}</Tooltip>}
      <Content isSelf={!!isSelf}>
        {strValue}
      </Content>
    </Wrapper>
  );
};

export default Volume;
