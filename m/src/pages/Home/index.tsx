import React, {
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import TableHandler from '../../handlers/table';
import TableSendOffersHandler from '../../handlers/tableSendOffers';

import {
  TItemTableResponse,
  TItemTable,
  TSelectedTtem,
} from '../../typing/table';
import {
  Container,
  HomeContainer,
  Title,
} from './Styles';
import SocketContext from '../../hooks/useSocket/context';
import { GlobalNotificationContext } from '../../hooks/useGlobalNotification';
import { AuthContext } from '../../hooks/useAuthenticate';
import DEFAULT_COLUMNS, { COLUMNS_SEND_OFFER } from '../../mocks/columns';
import UtilSocket from '../../utils/socket';
import {
  DICTIONARY_SIDE_TRANSACTION,
  SOCKET_CONNECTIONS_TYPES,
} from '../../utils/enum';
import {
  ACCESS_TYPES,
  verifyAccess,
} from '../../utils/access';
import {
  FilterTable,
  RunOptions,
  Blotter,
  Header,
  Panel,
} from '../../components';
import utilGoogleAnalitycs from '../../utils/ga';
import { TableContext } from '../../hooks/useTable';

export const Run = () => {
  const [data, setData] = useState<TItemTableResponse[]>([]);
  const [rowTable, setRowTable] = useState<TItemTable>();
  const [hasFeedback, setHasFeedback] = useState<'' | 'error' | 'warning' | 'success'>('');
  const [isOpennedPanel, setIsOpennedPanel] = useState<boolean>(false);
  const [isOpennedBlottler, setIsOpennedBlottler] = useState<boolean>(true);
  const [selectedItemRun, setSelectedItemRun] = useState<TSelectedTtem | undefined>();

  const context = useContext(SocketContext);
  const notificationContext = useContext(GlobalNotificationContext);
  const auth = useContext(AuthContext);
  const { connection, connected } = context;

  const tableContext = useContext(TableContext);

  const dataHandler = verifyAccess(auth.user, ACCESS_TYPES.SEND_OFFER.value)
    ? TableSendOffersHandler.dataHandler
    : TableHandler.dataHandler;

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

  useEffect(() => {
    const feedBackErrorMessage = () => {
      notificationContext.add({
        title: 'Ops! Parece que algo deu errado',
        type: 'error',
      });
    };

    if (notificationContext && hasFeedback === 'error') {
      feedBackErrorMessage();
      setHasFeedback('');
    }
  }, [
    notificationContext,
    hasFeedback,
  ]);

  const openPainel = (row: TItemTable) => {
    setRowTable(row);
    setSelectedItemRun({
      prop: 'ticker',
      value: row.ticker,
    });
    setIsOpennedPanel(true);
  };

  useEffect(() => {
    let processedItems: any = [];
    let isWaitingProcess = false;
    const TIME_PROCESS_INTERVAL = 2000;
    if (connected && connection) {
      let customData: TItemTableResponse[] = [];
      connection.on('AssetsRunResult', (response: TItemTableResponse[]) => {
        customData = UtilSocket.handlerWSData({
          socketData: response,
          customData,
          propId: 'id',
        });

        const tempData = dataHandler({
          items: customData as any || [],
          negociate: openPainel,
          tableContext,
          handle,
        });
        processedItems = [...tempData];
        if (!isWaitingProcess) {
          isWaitingProcess = true;
          if (processedItems.length) {
            setTimeout(
              () => {
                setData(processedItems);
                isWaitingProcess = false;
                processedItems = [];
              },
              TIME_PROCESS_INTERVAL,
            );
          }
        }
      });

      let excludedItems: any = [];
      const TIME_REMOVE_INTERVAL = 200;

      let isWaiting = false;
      const removeAssets = () => {
        const idsToRemove = new Set(excludedItems);
        customData = customData.filter((item) => !idsToRemove.has(item.id));
        setData(dataHandler({
          items: customData as any,
          negociate: openPainel,
          tableContext,
          handle,
        }));
        excludedItems = [];
      };

      connection.on('AssetWithoutOfferRunResult', (id: string) => {
        const findItem = customData.find((item) => item.id === id);
        if (findItem) {
          excludedItems.push(id);
          if (!isWaiting) {
            isWaiting = true;
            setTimeout(
              () => {
                removeAssets();
                isWaiting = false;
              },
              TIME_REMOVE_INTERVAL,
            );
          }
        }
      });

      connection.on('SearchAssetsRunResult', (response: any) => {
        customData = response;
        setData(dataHandler({
          items: customData as any,
          negociate: openPainel,
          tableContext,
          handle,
        }));
      });

      connection.on('CommandFailResult', (response: any) => {
        setHasFeedback('error');
        // eslint-disable-next-line no-console
        console.error(response);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    connection,
    connected,
  ]);

  useEffect(() => {
    utilGoogleAnalitycs.setGA('page', 'home', null);
  }, []);

  const closePanel = () => {
    setRowTable(undefined);
    setSelectedItemRun({
      prop: '',
      value: '',
    });
    setIsOpennedPanel(false);
  };

  const submitTransaction = (params: {
    side: number;
    floatGrossRate: number;
    quantity: number;
    ticker: string;
  }) => {
    if (connected && connection) {
      utilGoogleAnalitycs.setGA(
        'event',
        'Negociação',
        `${DICTIONARY_SIDE_TRANSACTION[params.side]} de ${params.ticker}`,
      );
      handle(
        {
          Type: SOCKET_CONNECTIONS_TYPES.OFFER_AGGRESSION_RUN,
          CommandData: {
            Side: params.side,
            Fee: params.floatGrossRate,
            Quantity: params.quantity,
            Ticker: params.ticker,
          },
        },
        null,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  useEffect(() => {
    if (tableContext?.selectingItem?.value) {
      setSelectedItemRun(tableContext?.selectingItem);
    } else {
      setSelectedItemRun({
        prop: '',
        value: '',
      });
    }
  }, [tableContext]);

  return (
    <>
      <Container>
        <Header />
        {!!connected && (
          <HomeContainer ticker={selectedItemRun?.value} name={selectedItemRun?.name}>
            <Title>
              RUN
              {verifyAccess(auth.user, ACCESS_TYPES.BROKER.value)
                && (
                  <RunOptions
                    context={context}
                    countItems={data.length}
                  />
                )}
            </Title>
            <FilterTable
              isOpennedBlottler={isOpennedBlottler}
              selectedItemRun={selectedItemRun}
              context={context}
              isSendOffer={verifyAccess(auth.user, ACCESS_TYPES.SEND_OFFER.value)}
              defaultColumns={verifyAccess(auth.user, ACCESS_TYPES.SEND_OFFER.value)
                ? COLUMNS_SEND_OFFER : DEFAULT_COLUMNS}
              data={data}
            />
            <Blotter
              setVisibility={setIsOpennedBlottler}
              open={isOpennedBlottler}
            />
            {rowTable && (
              <Panel
                submit={submitTransaction}
                closePanel={closePanel}
                isOpen={isOpennedPanel}
                rowTable={rowTable}
              />
            )}
          </HomeContainer>
        )}
      </Container>
    </>
  );
};

export default Run;
