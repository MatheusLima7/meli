import React from 'react';

import { TModalParams } from '../../../typing/confirmationModal';
import { ORDER_SIDE_TRANSACTION } from '../../../utils/enum';
import { TItemTable } from '../../../typing/table';
import NumberUtil from '../../../utils/number';
import FormActions from '../formActions';
import { TTransactionItem } from '..';

export type TTransactionsHendler = {
  transactions: Array<TTransactionItem>;
  ticker: string;
  name: string;
};

export default (
  item: TItemTable | undefined,
  submit: (params: TModalParams) => void,
): TTransactionsHendler => {
  if (!item) {
    return {
      name: '',
      ticker: '',
      transactions: [],
    };
  }

  const {
    emitter,
    ticker,
    offer,
    bid,
  } = item;

  return {
    name: emitter,
    ticker,
    transactions: [
      {
        indicators: [
          {
            id: 'indicator-offer-#1',
            value: `${NumberUtil.formatNumber(offer?.fee)}%`,
            label: 'Taxa Bruta',
          },
          {
            id: 'indicator-offer-#2',
            value: `${NumberUtil.formatNumber(offer?.finalFee)}%`,
            label: 'Taxa Final',
          },
          {
            id: 'indicator-offer-#3',
            value: offer?.finalUnitPrice,
            label: 'PU',
            color: '#fff',
            maskType: 'CURRENCY',
          },
          {
            id: 'indicator-offer-#4',
            label: `Liquidação D+${offer?.liquidation}`,
          },
        ],
        title: 'Comprar',
        disabled:
          !offer?.quantity
          || !offer?.finalFinantialVolume
          || !offer?.finalUnitPrice,
        formActions: (
          <FormActions
            testid={`transaction-${ticker}-0`}
            maxVolume={offer?.finalFinantialVolume}
            maxQuantity={offer?.quantity}
            rate={offer?.finalUnitPrice}
            ticker={ticker}
            button={{
              title: 'EU COMPRO (XP vende)',
              color: '#3DA0E5',
              action: (params: TModalParams) => submit({
                ...params,
                grossRate: `${NumberUtil.formatNumber(offer?.fee)}%`,
                floatGrossRate: offer?.fee,
                side: ORDER_SIDE_TRANSACTION.Offer,
                saleOff: `D+${offer?.liquidation}`,
                finalRate: `${NumberUtil.formatNumber(offer?.finalFee)}%`,
                title: 'EU COMPRO (XP VENDE)',
              }),
            }}
          />
        ),
      },
      {
        indicators: [
          {
            id: 'indicator-bid-#1',
            value: `${NumberUtil.formatNumber(bid?.fee)}%`,
            label: 'Taxa Bruta',
          },
          {
            id: 'indicator-bid-#2',
            value: `${NumberUtil.formatNumber(bid?.finalFee)}%`,
            label: 'Taxa Final',
          },
          {
            id: 'indicator-bid-#3',
            value: bid?.finalUnitPrice,
            label: 'PU',
            color: '#fff',
            maskType: 'CURRENCY',
          },
          {
            id: 'indicator-bid-#4',
            label: `Liquidação D+${bid?.liquidation}`,
          },
        ],
        title: 'Vender',
        disabled:
          !bid?.quantity
          || !bid?.finalFinantialVolume
          || !bid?.finalUnitPrice,
        formActions: (
          <FormActions
            testid={`transaction-${ticker}-1`}
            maxVolume={bid?.finalFinantialVolume}
            maxQuantity={bid?.quantity}
            rate={bid?.finalUnitPrice}
            ticker={ticker}
            button={{
              title: 'EU VENDO (XP Compra)',
              color: '#3DA0E5',
              action: (params: TModalParams) => submit({
                ...params,
                grossRate: `${NumberUtil.formatNumber(bid?.fee)}%`,
                floatGrossRate: bid?.fee,
                side: ORDER_SIDE_TRANSACTION.Bid,
                saleOff: `D+${bid?.liquidation}`,
                finalRate: `${NumberUtil.formatNumber(bid?.finalFee)}%`,
                title: 'EU VENDO (XP COMPRA)',
              }),
            }}
          />
        ),
      },
    ],
  };
};
