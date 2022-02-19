import React, { useContext, useCallback, useState } from 'react';
import { SomaIcon } from '@soma/react';
import SocketContext from '../../hooks/useSocket/context';
import { Icon, ModalList, ListItem } from './styles';
import { SOCKET_CONNECTIONS_TYPES } from '../../utils/enum';
import ConfirmationModal from '../ConfirmationModal';
import NumberUtil from '../../utils/number';

type TCancel = {
  tradeId: string;
  testId: string;
  ticker: string;
  typeNegociation: string;
  quantity: number;
  rate: number;
  finantial: number;
}

const Cancel = ({
  tradeId,
  testId,
  ticker,
  typeNegociation = 'COMPRA (XP VENDE)',
  quantity,
  rate,
  finantial = 1050000,
}: TCancel) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const context = useContext(SocketContext);
  const { connection, connected } = context;
  const handle = useCallback(
    (command, callback): void => {
      if (connected && connection) {
        connection
          .invoke('Handle', command)
          .then(() => {
            if (callback) callback();
          })
          .catch((err) => {
            // eslint-disable-next-line no-console
            console.error(err);
          })
          .finally();
      }
    },
    [connected, connection],
  );

  const onConfirmModal = () => {
    handle(
      {
        Type: SOCKET_CONNECTIONS_TYPES.MARKET_BUSINESS_CANCEL_ITEM,
        CommandData: {
          TradeId: tradeId,
        },
      },
      null,
    );
    setOpenModal(false);
  };

  return (
    <>
      <ConfirmationModal
        isOpen={openModal}
        descrition={`Você deseja cancelar a negociação de ${typeNegociation}
        de ${ticker}, com os seguintes valores?`}
        onCancel={() => setOpenModal(false)}
        title="Atenção"
        data-testid="confirmation-modal"
        className="danger"
        onConfirm={onConfirmModal}
        textConfirmButton="Cancelar negócio"
      >
        <ModalList>
          <ListItem>
            {'Quantidade: '}
            <span>
              {NumberUtil.formatNumber(quantity || 0, 0)}
            </span>
          </ListItem>
          <ListItem>
            {'Taxa Final: '}
            <span>
              {`${NumberUtil.formatNumber(
                rate || 0,
                2,
              )}%`}
            </span>
          </ListItem>
          <ListItem>
            {'Volume: '}
            <span>
              R$
              {' '}
              {NumberUtil.formatAbbreviationNumber(finantial || 0, 2)}
            </span>
          </ListItem>
        </ModalList>
      </ConfirmationModal>
      <Icon data-testid={testId} onClick={() => setOpenModal(true)}>
        <SomaIcon
          size="sm"
          icon="close"
          color="#C8CACD"
        />
      </Icon>
    </>
  );
};

export default Cancel;
