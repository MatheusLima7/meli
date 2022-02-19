import React, { useState, useCallback } from 'react';
import { Remove, Text } from './styles';
import ConfirmationModal from '../ConfirmationModal';
import { SOCKET_CONNECTIONS_TYPES } from '../../utils/enum';
import utilGoogleAnalitycs from '../../utils/ga';

type TRunOptions = { context: any, countItems: number }

const RunOptions = ({ countItems, context } : TRunOptions) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { connection, connected } = context;

  const handle = useCallback(
    (command, callback): void => {
      if (connected && connection) {
        connection
          .invoke('Handle', command)
          .then(() => {
            if (callback) callback();
          })
          .catch((err: any) => {
            // eslint-disable-next-line no-console
            console.error(err);
          })
          .finally();
      }
    },
    [connected, connection],
  );

  const onConfirmModal: () => void = () => {
    utilGoogleAnalitycs.setGA(
      'event',
      'Remover tudo',
      'Confirmação efetuada',
    );
    handle(
      {
        Type: SOCKET_CONNECTIONS_TYPES.REMOVE_ALL_OFFERS_RUN, CommandData: {},
      },
      null,
    );
    setOpenModal(false);
  };

  return (
    <>
      <Remove onClick={() => setOpenModal(true)}>
        Remover tudo
      </Remove>

      {openModal && (
        <ConfirmationModal
          isOpen={openModal}
          descrition={`Tem certeza que deseja remover todas as ordens de
          compra e venda publicadas no Run?`}
          onCancel={() => setOpenModal(false)}
          title="Atenção"
          data-testid="confirmation-modal"
          className="danger"
          onConfirm={onConfirmModal}
          textConfirmButton="Remover tudo"
        >
          <Text>
            Um total de
            {' '}
            {countItems}
            {' '}
            ativos terão suas ordens de compra e
            venda removidas imediatamente
          </Text>
        </ConfirmationModal>
      )}
    </>
  );
};

export default RunOptions;
