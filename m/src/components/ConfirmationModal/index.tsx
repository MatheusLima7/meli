import React from 'react';
import Modal from 'react-modal';

import {
  Wrapper,
  Title,
  Body,
  ModalList,
  ListIten,
  ContentSection,
  ActionSection,
  Descrition,
  Button,
} from './Styles';

export { ModalList, ListIten };

export type TConfirmationModal = {
  children?: React.ReactChild;
  onConfirm: () => void;
  onCancel: () => void;
  descrition: string;
  isOpen: boolean;
  title?: string;
  className?: string;
  textConfirmButton?: string
};

const customStyles = {
  overlay: {
    backgroundColor: 'transparent',
    zIndex: 100,
  },
  content: {
    transform: 'translate(-50%, -50%)',
    marginRight: '-50%',
    borderRadius: '4px',
    padding: '0px',
    bottom: 'auto',
    width: '380px',
    right: 'auto',
    left: '50%',
    top: '50%',
  },
};

export default ({
  isOpen,
  onCancel,
  onConfirm,
  title,
  descrition,
  children,
  className,
  textConfirmButton = 'Confirmar',
}: TConfirmationModal) => (
  <Modal
    contentLabel="Modal Confirmação"
    style={customStyles}
    ariaHideApp={false}
    isOpen={isOpen}
  >
    <Wrapper data-testid="confirmation-modal-wrapper">
      {title && (
        <Title className={className}>
          <h1>{title}</h1>
        </Title>
      )}
      <Body>
        <ContentSection>
          <Descrition>{descrition}</Descrition>
          {children}
        </ContentSection>
        <ActionSection>
          <Button styleType="secondary" onClick={onCancel}>
            Cancelar
          </Button>
          <Button className={className} data-testid="confirm-send-input" styleType="primary" onClick={onConfirm}>
            {textConfirmButton}
          </Button>
        </ActionSection>
      </Body>
    </Wrapper>
  </Modal>
);
