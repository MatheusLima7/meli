import { render } from '@testing-library/react';
import React from 'react';

import { TGlobalNotificationContext, GlobalNotificationContext } from '../../../hooks/useGlobalNotification';
import SocketContext from '../../../hooks/useSocket/context';
import { mockRequestMyBusiness, mockColumns } from '../../../mocks/myBusiness';
import UtilSocket from '../../../utils/socket';
import UtilColumns from '../../../utils/columns';
import MyBusiness from '..';

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
  add: jest.fn(),
  notifications: [],
  close: jest.fn(),
};

const useRefMock = jest.spyOn(React, 'useRef');
const mockCurrent: any = {
  current: {
    clientWidth: 1800,
  },
};

beforeEach(() => {
  useRefMock.mockReturnValue(mockCurrent);
});

jest.mock('../../../utils/socket', () => ({
  handlerWSData: jest.fn(),
}));

jest.mock('../../../utils/columns', () => ({
  setColumnWidth: jest.fn(),
}));

jest.mock('@xpinc-otc/table', () => (
  {
    Table: (props: any) => (
      <div
        {...props}
        data-testid="table-component"
      >
        Tabela
      </div>
    ),
  }
));

jest.mock('../../../components/Panel', () => (props: any) => (
  <div {...props} data-testid="boleta-component">Boleta</div>
));

// eslint-disable-next-line react/destructuring-assignment
global.console.error = jest.fn();

const DEFAULT_PROPS = {
  open: jest.fn(),
  search: '',
};

const renderComponent = (props: any = DEFAULT_PROPS) => (
  render(
    <GlobalNotificationContext.Provider value={mockGlobalNotificationValue}>
      <SocketContext.Provider value={mockProviderValue}>
        <MyBusiness {...props} />
      </SocketContext.Provider>
    </GlobalNotificationContext.Provider>,
  )
);

describe('myBusiness table', () => {
  beforeEach(() => {
    UtilSocket.handlerWSData.mockReturnValue(mockRequestMyBusiness);
    UtilColumns.setColumnWidth.mockReturnValue(mockColumns);
    mockProviderValue.connection.on.mockImplementation((
      connectionType: string,
      callBack: any,
    ) => {
      if (connectionType === 'TradesRunResult') callBack();
    });
  });
  afterEach(() => {
    mockProviderValue.connection.on.mockClear();
    UtilSocket.handlerWSData.mockClear();
    UtilColumns.setColumnWidth.mockClear();
  });
  test('should render the elements of home correctly', () => {
    const { getByTestId } = renderComponent();
    const homeTable = getByTestId('table-container');
    expect(homeTable).toBeTruthy();
  });

  test('should render initial states correctly', () => {
    const { getByTestId } = renderComponent();
    const element = getByTestId('table-component');
    expect(element.getAttribute('data')?.split(',')).toHaveLength(3);
    setTimeout(() => {
      expect(element.getAttribute('columns')?.split(',')).toHaveLength(10);
    }, 300);
  });

  test.skip('should render initial states correctly', () => {
    const { getByTestId } = renderComponent();

    const element = getByTestId('table-component');
    expect(element.getAttribute('data')?.split(',')).toHaveLength(3);
    setTimeout(() => {
      expect(element.getAttribute('columns')?.split(',')).toHaveLength(10);
    }, 300);
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
});
