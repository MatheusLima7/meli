import React, { useRef, useState, useEffect } from 'react';
import Transaction from 'xpinc-tools';
import { SomaIcon } from '@soma/react';
import {
  Wrapper,
  CloseButton,
} from './Styles';
import { TModalParams } from '../../typing/confirmationModal';
import ConfirmationSendOffer from '../ConfirmationSendOffer';
import transactionsHandler from './handlers/painel';
import { TItemTable } from '../../typing/table';
import useOutside from '../../hooks/useOutside';

export type TTransactionItem = {
  formActions: JSX.Element;
  indicators: Array<any>;
  disabled?: boolean;
  title: string;
};

export type TTransactionAction = {
  title: string;
  loading?: boolean;
  color: string;
  action: (params: TModalParams) => void;
};

export type TPanel = {
  isOpen: boolean;
  closePanel: () => void;
  rowTable: TItemTable;
  submit: ({
    side,
    floatGrossRate,
    quantity,
    ticker,
  }: {
    side: number;
    floatGrossRate: number;
    quantity: number;
    ticker: string;
  }) => void;
};

const Panel = ({
  isOpen,
  closePanel,
  submit,
  rowTable,
}: TPanel) => {
  const ref = useRef();
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [transactions, setTransactions] = useState<TTransactionItem[]>([]);
  const [modalParams, setModalParams] = useState<TModalParams>();
  const [ticker, setTiker] = useState<string>('');
  const [name, setName] = useState<string>('');

  useEffect(() => {
    const painelParams = transactionsHandler(rowTable, (params) => {
      setModalParams(params);
      setModalIsOpen(true);
    });
    setTiker(painelParams.ticker);
    setName(painelParams.name);
    setTransactions(painelParams.transactions);
  }, [rowTable]);

  useOutside(ref).listen(() => closePanel());

  const onConfirmModal: () => void = () => {
    if (modalParams) {
      submit({
        floatGrossRate: modalParams.floatGrossRate,
        quantity: modalParams.quantity || 0,
        ticker: modalParams.ticker,
        side: modalParams.side,
      });
      setModalIsOpen(false);
      closePanel();
    }
  };
  return (
    <Wrapper
      data-testid="painel-wrapper"
      ref={modalIsOpen ? null : ref}
      open={isOpen}
    >
      <CloseButton data-testid="close-button" onClick={closePanel}>
        <SomaIcon size="sm" icon="close" color="#B7CBEC" />
      </CloseButton>
      <Transaction
        itens={transactions}
        title="Solicitação"
        name={name}
        id={ticker}
      />
      {modalParams && (
        <ConfirmationSendOffer
          onConfirm={onConfirmModal}
          onCancel={() => setModalIsOpen(false)}
          modalParams={modalParams}
          isOpen={modalIsOpen}
        />
      )}
    </Wrapper>
  );
};

export default Panel;
