import React, {
  ReactElement,
  useEffect,
  useState,
} from 'react';
import { Wrapper } from './Styles';
import { TColumns } from '../../typing/table';
import Row from '../Row';

type TData = {
  id: string;
  breakEven: string;
  isFavorite: boolean;
  ticker: string;
  emitter: string;
  maturityDate: string;
  duration: number,
  anbima: number,
  ntnbTicker: string;
  indexName: string;
  remuneration: number;
  rating: string;
  offerFee?: ReactElement;
  offerQuantity?: ReactElement;
  bidQuantity?: ReactElement;
  bidFee?: ReactElement;
  bid: any;
  offer: any;
  negociate: ReactElement;
}

type TBodyTable = {
  getPU: (ticker: string, fee: number) => Promise<number | undefined>;
  isSendOffer: boolean;
  columns: TColumns[];
  data: TData[];
  handle: any;
}

const BodyTable = ({
  isSendOffer,
  columns,
  handle,
  getPU,
  data,
}: TBodyTable) => {
  const [hideItems, setHideItems] = useState<string[]>([]);

  useEffect(() => {
    const hide: any = [];

    columns.forEach((column: TColumns) => {
      if (column.hide && column.accessor) {
        hide.push(column.accessor);
      }
    });
    setHideItems(hide);
  }, [columns]);

  return (
    <Wrapper hideItems={hideItems} isSendOffer={isSendOffer}>
      {data.map((item: TData, index: number) => {
        const {
          id,
          isFavorite,
          ticker,
          emitter,
          maturityDate,
          duration,
          anbima,
          ntnbTicker,
          indexName,
          remuneration,
          rating,
          bid,
          offer,
          negociate,
          breakEven,
        } = item;

        return (
          <Row
            isSendOffer={isSendOffer}
            key={id}
            id={id}
            isFavorite={isFavorite}
            ticker={ticker}
            emitter={emitter}
            maturityDate={maturityDate}
            duration={duration}
            anbima={anbima}
            ntnbTicker={ntnbTicker}
            getPU={getPU}
            indexName={indexName}
            remuneration={remuneration}
            rating={rating}
            bid={bid}
            offer={offer}
            negociate={negociate}
            breakEven={breakEven}
            handle={handle}
            index={index}
          />
        );
      })}
    </Wrapper>
  );
};
export default BodyTable;
