import React, {
  useCallback, useState, useContext,
  useRef, useEffect, memo,
} from 'react';
import { Wrapper, Cell } from './Styles';
import Favorite from '../Favorite';
import HiddenText from '../HiddenText';
import DateUtil from '../../utils/date';
import NumberUtil from '../../utils/number';
import EditableCell from '../EditableCell';
import Volume from '../Volume';
import Actions from '../Actions';
import { TRow, TObjectMapData } from '../../typing/table';
import { SOCKET_CONNECTIONS_TYPES, ORDER_SIDE_TRANSACTION } from '../../utils/enum';
import { GlobalNotificationContext } from '../../hooks/useGlobalNotification';
import useOutside from '../../hooks/useOutside';
import utilValidate from '../../utils/validation/negotiationInput';
import ConfirmationSendOffer from '../ConfirmationSendOffer';
import { TModalParams } from '../../typing/confirmationModal';

type bidOfferValue = {
  bid: number | null, offer: number | null,
}

const calculateVolume: (puValue: number | undefined, quantityValue: number) =>
  number | null = (puValue, quantityValue) => {
    if (puValue && quantityValue) return puValue * quantityValue;
    if (puValue === 0 || quantityValue === 0) return 0;
    return null;
  };

const Row = ({
  id, isFavorite, ticker, emitter, maturityDate, duration, anbima,
  ntnbTicker, remuneration, rating, bid, offer, negociate, breakEven,
  handle, index, indexName, isSendOffer, getPU,
}: TRow) => {
  const [selectedRow, setSelectedRow] = useState<boolean>(false);
  const [selectedNameLine, setSelectedNameLine] = useState<'bid' | 'offer' | ''>('');
  const [countedSelectedSameLine, setCountedSelectedSameLine] = useState<number>(0);
  const [bidFee, setBidFee] = useState<number | undefined>(bid?.fee);
  const [bidQuantity, setBidQuantity] = useState<number | undefined>(bid?.quantity);
  const [offerFee, setOfferFee] = useState<number | undefined>(offer?.fee);
  const [offerQuantity, setOfferQuantity] = useState<number | undefined>(offer?.quantity);
  const [currentFocus, setCurrentFocus] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalParams, setModalParams] = useState<TModalParams>();
  const [rowData, setRowData] = useState<TObjectMapData>({
    bidFee: bid?.fee,
    bidQuantity: bid?.quantity,
    offerFee: offer?.fee,
    offerQuantity: offer?.quantity,
    updatedFields: [],
    fieldsError: [],
    localizationFocus: null,
    localizationMessage: null,
    message: null,
    type: null,

  });
  const [loadingVolume, setLoadingVolume] = useState<{ bid: boolean, offer: boolean }>({
    bid: false, offer: false,
  });
  const [financialVolume, setFinancialVolume] = useState<bidOfferValue>({
    bid: bid?.finantialVolume, offer: offer?.finantialVolume,
  });
  const [unitPrice, setUnitPrice] = useState<bidOfferValue>({
    bid: bid?.unitPrice, offer: offer?.unitPrice,
  });

  const notificationContext = useContext(GlobalNotificationContext);

  const wrapperRef = useRef(null);

  const onClickActions = useCallback((rowTicker: string, offerSide: number) => {
    handle({
      Type: SOCKET_CONNECTIONS_TYPES.REMOVE_OFFER_RUN,
      CommandData: {
        Ticker: rowTicker,
        OrderSide: offerSide,
        OrderId: id,
      },
    }, null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useOutside(wrapperRef).listen(() => {
    setSelectedRow(false);
    setSelectedNameLine('');
  });

  const resetRow = useCallback(() => {
    setRowData({
      bidFee: bid?.fee,
      bidQuantity: bid?.quantity,
      offerFee: offer?.fee,
      offerQuantity: offer?.quantity,
      updatedFields: [],
      fieldsError: [],
      localizationFocus: null,
      localizationMessage: null,
      message: null,
      type: null,
    });
    setBidFee(bid?.fee);
    setBidQuantity(bid?.quantity);
    setOfferFee(offer?.fee);
    setOfferQuantity(offer?.quantity);
    setFinancialVolume({
      bid: bid?.finantialVolume, offer: offer?.finantialVolume,
    });
    setUnitPrice({
      bid: bid?.unitPrice, offer: offer?.unitPrice,
    });
  }, [bid, offer]);

  const dictionaryNegotiation: any = {
    bidFee: {
      set: setBidFee,
      focus: 'bidQuantity',
    },
    bidQuantity: {
      set: setBidQuantity,
      focus: 'bidFee',
    },
    offerFee: {
      set: setOfferFee,
      focus: 'offerQuantity',
    },
    offerQuantity: {
      set: setOfferQuantity,
      focus: 'offerFee',
    },
  };

  useEffect(() => {
    if (modalOpen) {
      setModalOpen(false);
      setModalParams(undefined);
      notificationContext.add({
        title: `Houve atualização no ativo ${ticker}, tente novamente.`,
        type: 'warning',
      });
      resetRow();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bid, offer]);

  useEffect(() => {
    setBidFee(bid?.fee);
    setBidQuantity(bid?.quantity);
  }, [bid]);

  useEffect(() => {
    setOfferFee(offer?.fee);
    setOfferQuantity(offer?.quantity);
  }, [offer]);

  useEffect(() => {
    if (!selectedNameLine) {
      resetRow();
    }
  }, [selectedNameLine, resetRow]);

  useEffect(() => {
    if (modalOpen) {
      const volume = selectedNameLine ? financialVolume[selectedNameLine] : undefined;
      const pu = selectedNameLine ? unitPrice[selectedNameLine] : undefined;
      setModalParams((params: any) => ({
        ...params,
        financial: volume,
        pu,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    financialVolume.bid, financialVolume.offer, selectedNameLine,
    unitPrice.bid, unitPrice.offer, modalOpen,
  ]);

  const getFee = (isBid: boolean, row: TObjectMapData) => row[isBid ? 'bidFee' : 'offerFee'];

  const getQuantity = (isBid: boolean, row: TObjectMapData) => row[isBid ? 'bidQuantity' : 'offerQuantity'];

  const isOfferEvaluation = (
    isBid: boolean, row: TObjectMapData,
    fee: number | null | undefined,
  ) => {
    const currentBidFee = getFee(true, row);
    const currentOfferFee = getFee(false, row);
    if (isBid && offer?.isSelf) return false;
    if (!isBid && bid?.isSelf) return false;
    if (!fee && fee !== 0) return false;
    if (!currentBidFee && currentBidFee !== 0) return false;
    if (!currentOfferFee && currentOfferFee !== 0) return false;
    if (isBid) return fee <= currentOfferFee;

    return fee >= currentBidFee;
  };

  const sendOffer = ({ quantity, fee, side }: {
    quantity: any;
    fee: any; side: any;
  }) => {
    const command = {
      Type: SOCKET_CONNECTIONS_TYPES.INPUT_DATA,
      CommandData: {
        Ticker: ticker,
        Quantity: quantity,
        Fee: fee,
        Side: side,
      },
    };

    handle(command, null);
  };

  const onConfirmTrade = () => {
    sendOffer({
      quantity: modalParams?.quantity,
      fee: modalParams?.floatGrossRate,
      side: modalParams?.side,
    });
    setModalOpen(false);
    setModalParams(undefined);
  };

  const onCancel = () => {
    setModalOpen(false);
    setCurrentFocus(null);
    resetRow();
  };

  const openConfirmModal = (params: TModalParams) => {
    setModalParams(params);
    setModalOpen(true);
  };

  const sendNegotiation = (property: string, row: TObjectMapData, val: number) => {
    const isBid = (property.indexOf('bid') !== -1);
    const isQuantity = (property.indexOf('Quantity') !== -1);
    const isFee = (property.indexOf('Fee') !== -1);
    const side = isBid ? 1 : 2;
    const quantity = isQuantity ? val : getQuantity(isBid, row);
    const fee = isFee ? val : getFee(isBid, row);

    if (isOfferEvaluation(isBid, row, fee)) {
      const params: TModalParams = {
        grossRate: fee === null || fee === undefined ? '-' : `${NumberUtil.formatNumber(fee)}%`,
        saleOff: `D+${isBid ? bid?.liquidation : offer?.liquidation}`,
        title: isBid ? 'COMPRA' : 'VENDA',
        quantity: quantity || undefined,
        floatGrossRate: fee || 0,
        ticker,
        side,
      };

      if (isBid && fee === bid?.fee) {
        params.finalRate = `${NumberUtil.formatNumber(fee)}%`;
      }
      if (!isBid && fee === offer?.fee) {
        params.finalRate = `${NumberUtil.formatNumber(fee)}%`;
      }

      return openConfirmModal(params);
    }
    return sendOffer({ quantity, side, fee });
  };

  const mapEvents: any = {
    Enter: (
      e: any,
      property: string, type: 'quantity' | 'fee',
      negotiationType: 'bid' | 'offer',
      row: TObjectMapData,
    ) => {
      const { value } = e.target;
      const nextValue = Number(value.replace(/%|\./, '').replace(/,/g, '.'));
      const validation: any = utilValidate.negotiationValidate(
        nextValue, row, type, negotiationType,
      );
      const {
        fieldsError, localizationFocus, localizationMessage, message, type: typeFeedBack,
      } = validation;
      if (validation) {
        let nextUpdatedFields = [...row.updatedFields];
        let field: any = null;
        if (typeFeedBack !== 'error') {
          if (!nextUpdatedFields.includes(property)) {
            nextUpdatedFields.push(property);
          }
          field = property;
          dictionaryNegotiation[property].set(nextValue);
          if (nextUpdatedFields.length === 2) {
            sendNegotiation(property, row, nextValue);
            nextUpdatedFields = [];
          } else {
            setCurrentFocus(dictionaryNegotiation[property].focus);
          }
        }
        setRowData((currentState) => ({
          ...currentState,
          fieldsError,
          localizationFocus,
          localizationMessage,
          message,
          type: typeFeedBack,
          updatedFields: nextUpdatedFields,
          ...(field && { [property]: nextValue }),
        }));
      }
    },
  };

  const onKeyUp = useCallback((
    e: any, property: string, type: string, negotiationType: string, row: TObjectMapData,
  ) => {
    if (mapEvents[e.key]) {
      mapEvents[e.key](e, property, type, negotiationType, row);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const prepareView = (condition: boolean, formattedCalue: string) => (
    condition ? formattedCalue : '-'
  );

  const getVolume = async (
    feeType: 'offer' | 'bid', value: number | null,
    isFee: boolean, pu?: number | null,
  ) => {
    const puExists = pu || pu === 0;
    if (puExists && !isFee) {
      const quantity = value || 0;
      const volume = calculateVolume(
        unitPrice[feeType] || undefined,
        quantity,
      );

      return setFinancialVolume({
        ...financialVolume,
        [feeType]: volume,
      });
    }

    if (!value && value !== 0) {
      return setFinancialVolume({
        ...financialVolume,
        [feeType]: null,
      });
    }

    setLoadingVolume({
      ...loadingVolume,
      [feeType]: true,
    });

    const response = await getPU(ticker, value);
    const quantity = feeType === 'bid' ? bid?.quantity : offer?.quantity;
    const volume = calculateVolume(response, quantity);

    setUnitPrice({
      ...unitPrice,
      [feeType]: response,
    });

    setFinancialVolume({
      ...financialVolume,
      [feeType]: volume,
    });
    setLoadingVolume({
      ...loadingVolume,
      [feeType]: false,
    });
    return null;
  };

  return (
    <Wrapper
      key={`wrapper${id}`}
      ref={wrapperRef}
      className={`row ${selectedRow ? 'selected' : ''}`}
      data-testid="row-table"
      onClick={(e) => {
        e.preventDefault();
        setSelectedRow(true);
        if (selectedRow) {
          setCountedSelectedSameLine(countedSelectedSameLine + 1);
        }
      }}
    >
      <Cell className="favorite"><Favorite ticker={ticker} isFavorite={isFavorite} /></Cell>
      <Cell className="ticker" align="left">{ticker}</Cell>
      <Cell className="formattedEmitter" align="left"><HiddenText text={emitter} /></Cell>
      <Cell className="formattedDate">
        {maturityDate ? DateUtil.formatDate(maturityDate, 'MMM/YYYY') : maturityDate}
      </Cell>
      <Cell className="formattedDuration">{NumberUtil.formatNumber(duration)}</Cell>
      <Cell className="formattedAnbima">
        {anbima && NumberUtil.formatNumber(anbima, 4)}
        %
      </Cell>
      <Cell className="ntnbTicker">{ntnbTicker}</Cell>
      {(indexName && remuneration) && (
        <Cell className="formattedRemuneration">
          {indexName + (remuneration * 100).toFixed(4)}
          %
        </Cell>
      )}
      <Cell className="rating">{rating}</Cell>
      <Cell className="breakEven">{breakEven}</Cell>
      {!!isSendOffer
        && (
          <Cell className="bid action">
            <Actions
              ticker={ticker}
              isSelf={bid?.isSelf}
              onClick={onClickActions}
              offerSide={ORDER_SIDE_TRANSACTION.Bid}
            />
          </Cell>
        )}
      <Cell className="bid volume" padding="0">
        <Volume
          value={financialVolume.bid}
          loading={loadingVolume.bid}
          isSelf={isSendOffer ? bid?.isSelf : undefined}
        />
      </Cell>
      <Cell className="bid bidQuantity" padding="0">

        {
          isSendOffer
            ? (
              <EditableCell
                value={bidQuantity}
                decimal={0}
                name="bid"
                fieldName="Quantity"
                isSelf={bid?.isSelf}
                isSelected={selectedRow}
                countedSelectedSameLine={countedSelectedSameLine}
                setSelectedLine={(name: 'bid' | 'offer') => setSelectedNameLine(name)}
                onChange={(value: number | null) => getVolume('bid', value, false, unitPrice.bid)}
                selectedNameLine={selectedNameLine}
                rowData={rowData}
                index={index}
                onKeyUp={onKeyUp}
                hasCurrentFocus={(currentFocus === 'bidQuantity')}
                suffix={undefined}
                allowNegative={undefined}
                ticker={ticker}
              />
            )
            : prepareView(!!bid?.quantity, `${NumberUtil.formatNumber(bid?.quantity, 0)}`)
        }
      </Cell>
      <Cell className="bid fee" padding="0">
        {
          isSendOffer
            ? (
              <EditableCell
                value={bidFee}
                decimal={2}
                name="bid"
                fieldName="Fee"
                allowNegative
                suffix="%"
                isSelf={bid?.isSelf}
                isSelected={selectedRow}
                countedSelectedSameLine={countedSelectedSameLine}
                setSelectedLine={(name: 'bid' | 'offer') => setSelectedNameLine(name)}
                onChange={(value: number | null) => getVolume('bid', value, true, unitPrice.bid)}
                selectedNameLine={selectedNameLine}
                rowData={rowData}
                index={index}
                onKeyUp={onKeyUp}
                hasCurrentFocus={(currentFocus === 'bidFee')}
                ticker={ticker}
              />
            )
            : prepareView(!!bid?.quantity && bid?.quantity !== 0, `${NumberUtil.formatNumber(bid?.fee)}%`)
        }
      </Cell>
      <Cell className="offer fee" padding="0">
        {
          isSendOffer
            ? (
              <EditableCell
                value={offerFee}
                decimal={2}
                name="offer"
                fieldName="Fee"
                allowNegative
                suffix="%"
                isSelf={offer?.isSelf}
                isSelected={selectedRow}
                countedSelectedSameLine={countedSelectedSameLine}
                setSelectedLine={(name: 'bid' | 'offer') => setSelectedNameLine(name)}
                onChange={(value: number | null) => getVolume('offer', value, true, unitPrice.offer)}
                selectedNameLine={selectedNameLine}
                rowData={rowData}
                index={index}
                onKeyUp={onKeyUp}
                hasCurrentFocus={(currentFocus === 'offerFee')}
                ticker={ticker}
              />
            )
            : prepareView(!!offer?.quantity && offer?.quantity !== 0, `${NumberUtil.formatNumber(offer?.fee)}%`)
        }
      </Cell>
      <Cell className="offer Quantity" padding="0">
        {
          isSendOffer
            ? (
              <EditableCell
                value={offerQuantity}
                decimal={0}
                name="offer"
                fieldName="Quantity"
                isSelf={offer?.isSelf}
                isSelected={selectedRow}
                countedSelectedSameLine={countedSelectedSameLine}
                setSelectedLine={(name: 'bid' | 'offer') => setSelectedNameLine(name)}
                onChange={(value: number | null) => getVolume('offer', value, false, unitPrice.offer)}
                selectedNameLine={selectedNameLine}
                rowData={rowData}
                index={index}
                onKeyUp={onKeyUp}
                hasCurrentFocus={(currentFocus === 'offerQuantity')}
                suffix={undefined}
                allowNegative={undefined}
                ticker={ticker}
              />
            )
            : prepareView(!!offer?.quantity, `${NumberUtil.formatNumber(offer?.quantity, 0)}`)
        }
      </Cell>
      <Cell className="offer volume" padding="0">
        <Volume
          value={financialVolume.offer}
          loading={loadingVolume.offer}
          isSelf={isSendOffer ? offer?.isSelf : undefined}
        />
      </Cell>
      {isSendOffer
        && (
          <Cell className="offer action">
            <Actions
              ticker={ticker}
              isSelf={offer?.isSelf}
              onClick={onClickActions}
              offerSide={ORDER_SIDE_TRANSACTION.Offer}
            />
          </Cell>
        )}
      <Cell className="negotiate">{negociate}</Cell>
      {modalParams
        && (
          <ConfirmationSendOffer
            onConfirm={onConfirmTrade}
            onCancel={onCancel}
            modalParams={modalParams}
            isOpen={!!modalOpen}
          />
        )}
    </Wrapper>
  );
};

const areEqual = (prevProps: any, nextProps: any) => (
  prevProps.anbima === nextProps.anbima
  && prevProps.bid?.fee === nextProps.bid?.fee
  && prevProps.bid?.quantity === nextProps.bid?.quantity
  && prevProps.bid?.finantialVolume === nextProps.bid?.finantialVolume
  && prevProps.bid?.unitPrice === nextProps.bid?.unitPrice
  && prevProps.bid?.isSelf === nextProps.bid?.isSelf
  && prevProps.offer?.fee === nextProps.offer?.fee
  && prevProps.offer?.quantity === nextProps.offer?.quantity
  && prevProps.offer?.finantialVolume === nextProps.offer?.finantialVolume
  && prevProps.offer?.unitPrice === nextProps.offer?.unitPrice
  && prevProps.offer?.isSelf === nextProps.offer?.isSelf
  && prevProps.breakEven === nextProps.breakEven
  && prevProps.duration === nextProps.duration
  && prevProps.emitter === nextProps.emitter
  && prevProps.id === nextProps.id
  && prevProps.index === nextProps.index
  && prevProps.indexName === nextProps.indexName
  && prevProps.isFavorite === nextProps.isFavorite
  && prevProps.isSendOffer === nextProps.isSendOffer
  && prevProps.maturityDate === nextProps.maturityDate
  && prevProps.ntnbTicker === nextProps.ntnbTicker
  && prevProps.rating === nextProps.rating
  && prevProps.remuneration === nextProps.remuneration
  && prevProps.ticker === nextProps.ticker
);

export default memo(Row, areEqual);
