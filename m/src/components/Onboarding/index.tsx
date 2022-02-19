import React, { useState } from 'react';
import { SomaIcon } from '@soma/react';
import Modal from 'react-modal';
import Steps from './steps';

import {
  ContentsSection,
  StepsContainer,
  ActionSection,
  ImageSection,
  CloseButton,
  BodyTitle,
  Contents,
  Wrapper,
  Button,
  Title,
  Body,
  Step,
} from './Styles';

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    overflow: 'auto',
    zIndex: 100,
  },
  content: {
    transform: 'translate(-50%, -50%)',
    marginRight: '-50%',
    borderRadius: '4px',
    maxWidth: '756px',
    border: 'none',
    padding: '0px',
    bottom: 'auto',
    width: '100%',
    right: 'auto',
    left: '50%',
    top: '50%',
  },
};

export type TOnboarding = {
  isOpen: boolean;
  closeModal: () => void;
};

const Onboarding = ({ isOpen, closeModal }: TOnboarding) => {
  const [currentStep, setCurrentStep] = useState(0);
  const nextStep = () => {
    if (currentStep === Steps.length - 1) return setCurrentStep(0);
    return setCurrentStep(currentStep + 1);
  };

  const handlerCloseModal = () => {
    setCurrentStep(0);
    closeModal();
  };

  return (
    <Modal
      contentLabel="Modal onboarding"
      style={customStyles}
      ariaHideApp={false}
      isOpen={!!isOpen}
    >
      <Wrapper data-testid="onboarding-modal-wrapper">
        <div>
          <ImageSection>
            <img
              src={Steps[(currentStep)].img.src}
              alt={Steps[(currentStep)].img.alt}
            />
          </ImageSection>
        </div>
        <ContentsSection>
          <Title>
            <h1>Conheça a plataforma de Títulos Privados</h1>
          </Title>
          <CloseButton data-testid="close-button" onClick={handlerCloseModal}>
            <SomaIcon size="sm" icon="close" color="#262D3F" />
          </CloseButton>
          <Body>
            <div>
              <BodyTitle>{Steps[(currentStep)].title}</BodyTitle>
              <Contents>{Steps[(currentStep)].contents()}</Contents>
            </div>
            <ActionSection>
              <StepsContainer>
                {
                  Steps.map((step, index) => (
                    <Step
                      className={`step${index === currentStep ? '-active' : ''}`}
                      onClick={() => setCurrentStep(index)}
                      active={index === currentStep}
                      data-testid="step-component"
                      key={`step-${step.id}`}
                      role="presentation"
                    />
                  ))
                }
              </StepsContainer>
              <Button data-testid="next-button" onClick={nextStep}>
                Próximo
              </Button>
            </ActionSection>
          </Body>
        </ContentsSection>
      </Wrapper>
    </Modal>
  );
};

export default Onboarding;
