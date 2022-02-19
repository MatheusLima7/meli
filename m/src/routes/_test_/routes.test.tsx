import React from 'react';
import { render } from '@testing-library/react';

import RouteConfig from '..';

jest.mock('react-router-dom', () => ({
  BrowserRouter: () => <div />,
  Route: () => <div />,
  Switch: () => <div />,
}));

jest.mock('../../hooks/useSocket/provider', () => () => <div />);

const makeComponentStub = () => (render(<RouteConfig />));

describe('RouteConfig', () => {
  describe('Render', () => {
    it('should render RouteConfig', () => {
      expect(makeComponentStub()).toBeDefined();
    });
  });
});
