import {
  SomaButton,
  SomaCardActions,
  SomaCardContent,
  SomaCardHeader,
  SomaLink,
  SomaTypography,
} from '@soma/react';
import React, { memo } from 'react';
import { MessageContainer, Card } from './atoms';

const triggerError = () => {
  throw new Error('From two');
};

export default memo(() => (
  <Card>
    <SomaCardHeader>
      <SomaTypography variant="heading" modifier="heading-4">
        Bem vindo!
      </SomaTypography>
    </SomaCardHeader>
    <SomaCardContent>
      <MessageContainer>
        <SomaTypography variant="paragraph">
          Seu projeto está pronto. Dentro da pasta
          <strong> exports </strong>
          você encontrará os componentes que estão sendo expostos para outros
          serviços consumirem.
          <SomaButton onClick={triggerError}>Trigger Error</SomaButton>
        </SomaTypography>
      </MessageContainer>

      <MessageContainer>
        <SomaTypography variant="paragraph">
          O aquivo
          <strong> App.tsx </strong>
          representa o componente que será usado apenas em modo de
          desenvolvimento. Você pode usa-lo para simular um cenário real.
        </SomaTypography>
      </MessageContainer>
    </SomaCardContent>
    <SomaCardActions>
      <SomaLink
        aria-label="Ir para a documentação oficial"
        href="https://arsenal.xpi.com.br"
        target="_blank"
      >
        Documentação oficial
      </SomaLink>
    </SomaCardActions>
  </Card>
));
