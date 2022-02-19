import React from 'react';
import { expose } from '@arsenal/react';
import Monitoring, { DatadogProvider } from '@web-monitoring/browser';
import ErrorBoundary from '@web-monitoring/react';
import { Container } from './Styles';
import Routes from '../routes';
import GlobalStyleSheet from '../core/style';
import WebLock from '../components/WebLock';

// Datadogx
// Initialize monitoring.
const instance = Monitoring.init(new DatadogProvider({
  name: 'XPInc.FixedIncome.ExpInstitutional.RUN',
  applicationId: '57b40f08-25c0-482c-8557-107df437deaf',
  clientToken: 'pub66377d1a7aec4afa365c365d3f60327e',
  environment: process.env.NAME || 'local',
  version: process.env.BUILD_NUMBER || 'unknown',
}));

export const Main = () => (
  <ErrorBoundary
    instance={instance}
    fallback={<p>Ocorreu algum erro, por favor, informe ao administrador</p>}
  >
    <div data-testid="container">
      <GlobalStyleSheet />
      <WebLock />
      <Container data-testid="route-config">
        <Routes />
      </Container>
    </div>
  </ErrorBoundary>
);

export default expose(Main);
