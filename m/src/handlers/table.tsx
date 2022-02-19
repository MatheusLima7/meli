import React, { ReactElement } from 'react';
import Favorite from '../components/Favorite';
import Button from '../components/Button';
import HiddenText from '../components/HiddenText';
import NumberUtil from '../utils/number';
import DateUtil from '../utils/date';
import { TItemTable, TItemTableResponse } from '../typing/table';
import Volume from '../components/Volume';

const handleNullOrUndefined: (values: Array<any>, component: ReactElement | string) =>
  any = (values: Array<any>, component: any) => {
    if (values.findIndex((item: string | number) => (
      item === null || item === undefined
    )) > -1) return '-';
    return component;
  };

export type TDataHandler = {
  negociate: (item: TItemTable) => void;
  notificationContext?: any;
  items: Array<TItemTable>;
  tableContext?: any;
}

const dataHandler = ({
  negociate,
  items,
}: TDataHandler) => {
  const response: TItemTableResponse[] = [];
  if (items) {
    items
      .forEach((item: TItemTable, index: number) => {
        response.push({
          ...item,
          index,
          bidFee: handleNullOrUndefined([
            item?.bid?.quantity,
            item?.bid?.quantity !== 0 ? item?.bid?.fee : null,
          ], `${NumberUtil.formatNumber(item?.bid?.fee)}%`),
          bidQuantity: handleNullOrUndefined(
            [item?.bid?.quantity],
            `${NumberUtil.formatNumber(item?.bid?.quantity, 0)}`,
          ),
          bidFinancialVolume: handleNullOrUndefined(
            [item?.bid?.finantialVolume],
            <Volume value={item?.bid?.finantialVolume} />,
          ),
          offerFee: handleNullOrUndefined(
            [item?.offer?.quantity, item?.offer?.quantity !== 0 ? item?.offer?.fee : null],
            `${NumberUtil.formatNumber(item?.offer?.fee)}%`,
          ),
          offerQuantity: handleNullOrUndefined(
            [item?.offer?.quantity],
            `${NumberUtil.formatNumber(item?.offer?.quantity, 0)}`,
          ),
          offerFinancialVolume: handleNullOrUndefined(
            [item?.offer?.finantialVolume],
            <Volume value={item?.offer?.finantialVolume} />,
          ),
          fav: <Favorite ticker={item.ticker} isFavorite={item.isFavorite} />,
          breakEven: handleNullOrUndefined(
            [item.breakEven],
            `${NumberUtil.formatNumber(item.breakEven)}`,
          ),
          formattedAnbima: handleNullOrUndefined(
            [item?.anbima],
            `${NumberUtil.formatNumber(item.anbima, 4)}%`,
          ),
          formattedDuration: handleNullOrUndefined(
            [item.duration],
            `${NumberUtil.formatNumber(item.duration)}`,
          ),
          formattedDate: handleNullOrUndefined(
            [item.maturityDate],
            `${DateUtil.formatDate(item.maturityDate, 'MMM/YYYY')}`,
          ),
          formattedRemuneration: handleNullOrUndefined(
            [item.remuneration, item.indexName],
            `${`${item.indexName} ${(item.remuneration * 100).toFixed(4)}`}%`,
          ),
          negociate: (
            <Button
              testid={`test-${item.ticker}`}
              isEnabled
              id={item.id}
              onClick={() => negociate(item)}
              item={item}
            >
              Negociar
            </Button>
          ),
          formattedEmitter:
            handleNullOrUndefined([item.emitter], <HiddenText text={item.emitter} />),
        });
      });
  }

  return response;
};

export default { dataHandler };
