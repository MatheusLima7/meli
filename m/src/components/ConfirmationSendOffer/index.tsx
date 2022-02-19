import React, { useState, useEffect } from 'react';
import { FiAlertCircle } from 'react-icons/fi';

import { TModalParams } from '../../typing/confirmationModal';
import NumberUtil from '../../utils/number';
import ConfirmationModal, {
  ModalList,
  ListIten,
} from '../ConfirmationModal';
import { Wrapper, AlertMessage } from './Styles';

type TBodyTable = {
  modalParams: TModalParams;
  onConfirm: () => void;
  onCancel: () => void;
  isOpen: boolean;
}

const ConfirmationSendOffer = ({
  modalParams,
  onConfirm,
  onCancel,
  isOpen,
}: TBodyTable) => {
  const [alertMessage, setAlertMessage] = useState<string | undefined>();

  useEffect(() => {
    const getMessage = () => {
      if (!modalParams?.finalRate && !modalParams?.financial) {
        return setAlertMessage('Cálculo do volume e taxa final indisponível no momento. Você pode executar sua operação normalmente.');
      }
      if (!modalParams?.financial) {
        return setAlertMessage('Cálculo do volume indisponível no momento. Você pode executar sua operação normalmente.');
      }

      return setAlertMessage('Cálculo da taxa final indisponível no momento. Você pode executar sua operação normalmente.');
    };
    if (!modalParams?.finalRate || !modalParams?.financial) getMessage();
  }, [modalParams?.finalRate, modalParams?.financial]);

  return (
    <ConfirmationModal
      isOpen={isOpen}
      descrition={`Você deseja confirmar a ordem de ${modalParams.title} de ${modalParams.ticker.toUpperCase()} com os seguintes valores?`}
      onCancel={onCancel}
      onConfirm={onConfirm}
      title="Confirmação de negociação"
      data-testid="confirmation-modal"
    >
      <Wrapper>
        <ModalList>
          <ListIten>
            {'Quantidade: '}
            <span>
              {
                modalParams.quantity || modalParams.quantity === 0
                  ? NumberUtil.formatNumber(modalParams.quantity, 0)
                  : '-'
              }
            </span>
          </ListIten>
          <ListIten>
            {'Volume: '}
            <span>
              {
                modalParams.financial || modalParams.financial === 0
                  ? `R$ ${NumberUtil.formatNumber(
                    modalParams.financial,
                    2,
                  )}`
                  : '--'
              }
            </span>
          </ListIten>
          <ListIten>
            {'Taxa Bruta: '}
            <span>
              {modalParams.grossRate}
            </span>
          </ListIten>
          <ListIten>
            {'Taxa Final: '}
            <span>
              {modalParams.finalRate || '--'}
            </span>
          </ListIten>
          <ListIten>
            {`Liquidação ${modalParams.saleOff}`}
          </ListIten>
        </ModalList>
        {!!alertMessage
          && (
            <AlertMessage>
              <FiAlertCircle />
              <span>{alertMessage}</span>
            </AlertMessage>
          )}
      </Wrapper>
    </ConfirmationModal>
  );
};

export default ConfirmationSendOffer;
