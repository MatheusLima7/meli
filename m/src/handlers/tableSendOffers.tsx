import React from 'react';
import Favorite from '../components/Favorite';
import Button from '../components/Button';
import HiddenText from '../components/HiddenText';
import NumberUtil from '../utils/number';
import DateUtil from '../utils/date';
import { TItemTable, TItemTableResponse } from '../typing/table';

const handleNullOrUndefined: (values: Array<any>, component: any) =>
  any = (values: Array<any>, component: any) => {
    if (values.findIndex((item: string | number) => (
      item === null || item === undefined
    )) > -1) return '-';
    return component;
  };

export type TDataHandler = {
  negociate: (item: TItemTable) => void;
  items: Array<TItemTable>;
  tableContext?: any;
  handle?: any;
}

const dataHandler = ({
  negociate,
  items,
}: TDataHandler) => {
  const response: TItemTableResponse[] = [];
  if (items) {
    items
      .forEach((item: any, index: number) => {
        const {
          maturityDate, remuneration,
          ticker, isFavorite,
          breakEven, duration,
          indexName, emitter,
          ntnbTicker, rating,
        } = item;
        response.push({
          ...item,
          index,
          fav: <Favorite ticker={ticker} isFavorite={isFavorite} />,
          ticker: handleNullOrUndefined(
            [ticker],
            ticker,
          ),
          rating: handleNullOrUndefined(
            [rating],
            rating,
          ),
          ntnbTicker: handleNullOrUndefined(
            [ntnbTicker],
            ntnbTicker,
          ),
          breakEven: handleNullOrUndefined(
            [breakEven],
            `${NumberUtil.formatNumber(breakEven)}`,
          ),
          formattedAnbima: handleNullOrUndefined(
            [item?.anbima],
            `${NumberUtil.formatNumber(item.anbima, 4)}%`,
          ),
          formattedDuration: handleNullOrUndefined(
            [duration],
            `${NumberUtil.formatNumber(duration)}`,
          ),
          formattedDate: handleNullOrUndefined(
            [maturityDate],
            `${DateUtil.formatDate(maturityDate, 'MMM/YYYY')}`,
          ),
          formattedRemuneration: handleNullOrUndefined(
            [remuneration, indexName],
            `${`${indexName} ${(remuneration * 100).toFixed(4)}`}%`,
          ),
          negociate: (
            <Button
              testid={`test-${ticker}`}
              onClick={() => negociate(item)}
              id={item.id}
              item={item}
              isEnabled
            >
              Negociar
            </Button>
          ),
          formattedEmitter:
            handleNullOrUndefined([emitter], <HiddenText text={emitter} />),
        });
      });
  }
  return response;
};

export default { dataHandler };
