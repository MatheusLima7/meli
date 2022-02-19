import React from 'react';
import NumberFormat from 'react-number-format';
import NumberUtil from '../utils/number';
import DateUtil from '../utils/date';
import { TBlotterData, TColorDictionary } from '../typing/blotter';
import BulletPoint from '../components/BulletPoint';
import Cancel from '../components/Cancel';

const directionDictionary: any = [
  {
    name: 'Compra',
    color: '#3DA0E5',
    value: 1,
  },
  {
    name: 'Venda',
    color: '#298833',
    value: 2,
  },
];

const statusDictionary: any = [
  {
    name: 'Confirmado',
    color: '#298833',
    value: 1,
  },
  {
    name: 'Cancelado',
    color: '#DB2B2B',
    value: 2,
  },
  {
    name: 'Confirmado',
    color: '#298833',
    value: 3,
  },
];

const checkStatus = (value: number, defaultValue: string, propName: string) => {
  const item = statusDictionary.find(
    (row: TColorDictionary) => row.value === value,
  );
  const resp: string = item ? item[propName] : defaultValue;
  return resp;
};

const checkDirection = (
  value: number,
  defaultValue: string,
  propName: string,
) => {
  const item = directionDictionary.find(
    (row: TColorDictionary) => row.value === value,
  );
  const resp: string = item ? item[propName] : defaultValue;
  return resp;
};

const formatData = (items: Array<TBlotterData>, isBroker: boolean) => {
  const response: TBlotterData[] = [];
  if (items) {
    items.forEach((item: TBlotterData) => {
      response.push({
        formattedDate: `${DateUtil.formatDate(
          item.date,
          'DD/MM/YYYY HH:mm:ss',
        )}`,
        formattedFee: `${NumberUtil.formatNumber(item.fee)}%`,
        ...(item.finalFee && { formattedFinalFee: `${NumberUtil.formatNumber(item.finalFee)}%` }),
        ...(item.finalFinantialVolume && { formattedFinancialVolume: `${NumberUtil.formatNumber(item.finalFinantialVolume, 2)}` }),
        ...(item.buyFinalFinantialVolume && { formattedBuyFinalFinancialVolume: `${NumberUtil.formatNumber(item.buyFinalFinantialVolume, 2)}` }),
        ...(item.sellFinalFinantialVolume && { formattedSellFinalFinancialVolume: `${NumberUtil.formatNumber(item.sellFinalFinantialVolume, 2)}` }),
        ...(item.maturityDate && {
          formattedMaturityDate: `${DateUtil.formatDate(
            item.maturityDate,
            'MMM/YYYY',
          )}`,
        }),
        ...(item.finalUnitPrice && {
          formattedUnitPrice: <NumberFormat
            displayType="text"
            thousandSeparator="."
            decimalSeparator=","
            fixedDecimalScale
            decimalScale={6}
            prefix=""
            value={item.finalUnitPrice}
          />,
        }),
        ...(item.buyFinalUnitPrice && {
          formattedBuyUnitPrice: <NumberFormat
            displayType="text"
            thousandSeparator="."
            decimalSeparator=","
            fixedDecimalScale
            decimalScale={6}
            prefix=""
            value={item.buyFinalUnitPrice}
          />,
        }),
        ...(item.sellFinalUnitPrice && {
          formattedSellUnitPrice: <NumberFormat
            displayType="text"
            thousandSeparator="."
            decimalSeparator=","
            fixedDecimalScale
            decimalScale={6}
            prefix=""
            value={item.sellFinalUnitPrice}
          />,
        }),
        ...(item.status && {
          formattedStatus: (
            <BulletPoint
              testid={`my-business-status-${item.ticker}`}
              label={checkStatus(item.status, '', 'name')}
              color={checkStatus(item.status, 'transparent', 'color')}
            />
          ),
        }),
        formattedDirection: (
          <BulletPoint
            testid={`my-business-${item.ticker}`}
            label={checkDirection(item.side, '', 'name')}
            color={checkDirection(item.side, 'transparent', 'color')}
          />
        ),
        ...item,
        ...(isBroker && item.seller ? { seller: item.seller } : { seller: '-' }),
        ...(isBroker && item.buyer ? { buyer: item.buyer } : { buyer: '-' }),
        ...(isBroker && item.status !== statusDictionary[1].value ? {
          cancel: <Cancel
            typeNegociation={item.side === 1 ? 'COMPRA (XP VENDE)' : 'VENDE (XP COMPRA)'}
            quantity={item.quantity || 0}
            rate={item.fee}
            finantial={item.finantialVolume}
            ticker={item.ticker}
            testId={`market-business-cancel-${item.ticker}`}
            tradeId={item.tradeId}
          />,
        } : { cancel: '' }),
      });
    });
  }

  return response;
};

export default { formatData };
