import { render } from '@testing-library/react';
// eslint-disable-next-line import/no-unresolved
import { Simulate } from 'react-dom/test-utils';
import React from 'react';

import { TGlobalNotificationContext, GlobalNotificationContext } from '../../../hooks/useGlobalNotification';
import { AuthContext } from '../../../hooks/useAuthenticate';
import SocketContext from '../../../hooks/useSocket/context';
import { mockRequestRunResult } from '../../../mocks/runResult';
import UtilSocket from '../../../utils/socket';
import Home from '..';

const mockProviderValue: any = {
  connection: new (class {
    invoke = () => ({
      then: () => ({
        catch: () => ({
          finally: jest.fn(),
        }),
      }),
    });
    on = jest.fn();
  })(),
  connected: true,
  setConfigByComponent: jest.fn(),
};

const mockGlobalNotificationValue: TGlobalNotificationContext = {
  notifications: [],
  close: jest.fn(),
  add: jest.fn(),
};

jest.mock('../../../utils/socket', () => ({
  handlerWSData: jest.fn(),
}));

jest.mock('../../../components/Blotter', () => () => (
  <div data-testid="blotter-component">Blotter</div>
));

jest.mock('@xpinc-otc/table', () => (
  {
    Table: (props: any) => {
      const { data } = props;
      return (
        <div
          {...props}
          data-testid="table-component"
        >
          {data.map((item: any) => item.negociate)}
        </div>
      );
    },
  }
));

jest.mock('../../../components/Panel', () => (props: any) => (
  <div {...props} data-testid="boleta-component">Boleta</div>
));

// eslint-disable-next-line react/destructuring-assignment
global.console.error = jest.fn();

const mockAuthProviderValue: any = {
  setToken: jest.fn(),
  setUser: jest.fn(),
  token: '123',
  user: {
    firm: undefined,
    features: [1],
    name: 'name',
    id: 1,
  },
};

const renderComponent = () => (
  render(
    <GlobalNotificationContext.Provider value={mockGlobalNotificationValue}>
      <AuthContext.Provider value={mockAuthProviderValue}>
        <SocketContext.Provider value={mockProviderValue}>
          <Home />
        </SocketContext.Provider>
      </AuthContext.Provider>
    </GlobalNotificationContext.Provider>,
  )
);

describe('Home Screen', () => {
  beforeEach(() => {
    UtilSocket.handlerWSData.mockReturnValue(mockRequestRunResult);
    mockProviderValue.connection.on.mockImplementation((
      connectionType: string,
      callBack: any,
    ) => {
      if (connectionType === 'AssetsRunResult') callBack();
    });
  });
  afterEach(() => {
    mockProviderValue.connection.on.mockClear();
    UtilSocket.handlerWSData.mockClear();
  });
  test('should render the elements of home correctly', () => {
    const { getByTestId } = renderComponent();
    const homeTable = getByTestId('home-table');
    expect(homeTable).toBeTruthy();

    const homeFilters = getByTestId('home-filters');
    expect(homeFilters).toBeTruthy();
  });

  test.skip('should render initial states correctly', () => {
    const { getByTestId } = renderComponent();
    const element = getByTestId('table-component');
    expect(element.getAttribute('data')?.split(',')).toHaveLength(3);
    expect(element.getAttribute('columns')?.split(',')).toHaveLength(12);
  });

  test.skip('should render initial states correctly', () => {
    const { getByTestId } = renderComponent();

    const element = getByTestId('table-component');
    expect(element.getAttribute('data')?.split(',')).toHaveLength(3);
    expect(element.getAttribute('columns')?.split(',')).toHaveLength(12);
  });

  test.skip('should remove row from state correctly', () => {
    mockProviderValue.connection.on.mockImplementation((
      connectionType: string,
      callBack: any,
    ) => {
      if (connectionType === 'AssetsRunResult') callBack();
      if (connectionType === 'AssetWithoutOfferRunResult') callBack(mockRequestRunResult[1].id);
    });

    const { getByTestId } = renderComponent();
    const element = getByTestId('table-component');
    expect(element.getAttribute('data')?.split(',')).toHaveLength(3);
  });

  test.skip('should Search data correctly', () => {
    mockProviderValue.connection.on.mockImplementation((
      connectionType: string,
      callBack: any,
    ) => {
      if (connectionType === 'SearchAssetsRunResult') callBack(mockRequestRunResult);
    });

    const { getByTestId } = renderComponent();
    const element = getByTestId('table-component');
    expect(element.getAttribute('data')?.split(',')).toHaveLength(3);
  });

  test('should display error notification in case of socket error message', () => {
    const errorMessage = new Error('Error Message');
    mockProviderValue.connection.on.mockImplementation((
      connectionType: string,
      callBack: any,
    ) => {
      if (connectionType === 'CommandFailResult') callBack(errorMessage);
    });

    expect(mockGlobalNotificationValue.add).toHaveBeenCalledTimes(0);
    // eslint-disable-next-line no-console
    expect(console.error).toHaveBeenCalledTimes(0);
    renderComponent();
    expect(mockGlobalNotificationValue.add).toHaveBeenCalledTimes(1);
    // eslint-disable-next-line no-console
    expect(console.error).toHaveBeenCalledTimes(1);
    // eslint-disable-next-line no-console
    expect(console.error).toHaveBeenCalledWith(errorMessage);
  });

  test.skip('must open the boleta correctly', async () => {
    mockProviderValue.connection.on.mockImplementation((
      connectionType: string,
      callBack: any,
    ) => {
      if (connectionType === 'AssetsRunResult') callBack();
    });

    const { getByTestId, queryByTestId } = renderComponent();
    const actionElement = getByTestId(`test-${mockRequestRunResult[1].ticker}`);
    expect(queryByTestId('boleta-component')).toBeNull();
    Simulate.click(actionElement);
    const componentElement = getByTestId('boleta-component');
    expect(componentElement).toBeDefined();
  });
});
