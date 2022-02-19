import React,
{
  useState,
  useContext,
  useEffect,
  useRef,
} from 'react';
import { Table } from '@xpinc-otc/table';
import DEFAULT_COLUMNS from '../../mocks/columns-blotter';
import { TableContainer } from './Styles';
import { TMyBusiness, TBlotterData } from '../../typing/blotter';
import { GlobalNotificationContext } from '../../hooks/useGlobalNotification';
import SocketContext from '../../hooks/useSocket/context';
import utilBlotter from '../../handlers/blotter';
import { TColumns } from '../../typing/table';
import UtilSocket from '../../utils/socket';
import { sortableDictionaryMyBusiness, COMPONENTS_BY_PROFILE } from '../../utils/enum';
import { sortData } from '../../utils/sort';
import utilGoogleAnalitycs from '../../utils/ga';
import utilColumns from '../../utils/columns';
import storage from '../../utils/storage';

const MyBusiness = ({ open, search, active }: TMyBusiness) => {
  const [data, setData] = useState<TBlotterData[]>([]);
  const [hasFeedback, setHasFeedback] = useState<'' | 'error' | 'warning' | 'success'>('');

  const notificationContext = useContext(GlobalNotificationContext);
  const context = useContext(SocketContext);
  const { connection, connected } = context;

  const { set: setLocalStorage, get: getLocalStorage } = storage('localStorage');

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

  useEffect(() => {
    if (connected && connection) {
      let customData: TBlotterData[] = [];
      connection.on('TradesRunResult', (response: TBlotterData[]) => {
        customData = UtilSocket.handlerWSData({
          customData,
          socketData: response,
          propId: 'tradeId',
        });
        setData(
          utilBlotter.formatData(
            customData,
            false,
          ),
        );
      });

      connection.on('CommandFailResult', (response: any) => {
        setHasFeedback('error');
        // eslint-disable-next-line no-console
        console.error(response);
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connected, connection]);

  const [sortProp, setSortProp] = useState('');
  const [descProp, setDescProp] = useState(false);
  const ref: any = useRef();

  const [filterData, setFilterData] = useState<TBlotterData[]>([]);
  const [useFilterData, setUseFilterData] = useState<boolean>(false);
  useEffect(() => {
    if (search) {
      utilGoogleAnalitycs.setGA(
        'event',
        'Pequisa na Tabela de Meus Negócios',
        `Valor: ${search}`,
      );
      const tpmData: any = data.filter((item) => {
        if (item.ticker.indexOf(search.toUpperCase()) !== -1) {
          return item;
        }
        return null;
      });
      setFilterData(tpmData);
      setUseFilterData(true);
    } else {
      setFilterData([]);
      setUseFilterData(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const [blotterColumns, setBlotterColumns] = useState<TColumns[]>([]);

  useEffect(() => {
    const cols: TColumns[] = DEFAULT_COLUMNS;
    setTimeout(() => {
      const cachedResizeColumns = getLocalStorage('ResizeTableMyBusiness');
      const columns = utilColumns.setColumnWidth(ref, cols, true, cachedResizeColumns);
      setBlotterColumns(columns);
    }, 300);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    context.setConfigByComponent(COMPONENTS_BY_PROFILE.MY_BUSINESS);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setInfoResizing = (info: { [key: string] : number }) => {
    if (JSON.stringify(info) !== '{}') {
      setLocalStorage('ResizeTableMyBusiness', JSON.stringify(info));
    }
  };

  return (
    <TableContainer ref={ref} data-testid="table-container" active={active} open={open}>
      <Table
        setInfoResizing={setInfoResizing}
        columns={blotterColumns}
        hidden={!open}
        loading={false}
        asyncSortByFn={(sortBy: Array<{ id: string; desc: boolean }>) => {
          if (sortBy.length) {
            const { id, desc } = sortBy[0];
            const sortableField: string = sortableDictionaryMyBusiness[id] || id;

            utilGoogleAnalitycs.setGA(
              'event',
              'Ordenação na Tabela de Meus Negócios',
              `Campo: ${sortableField}, Direção: ${desc ? 'DESC' : 'ASC'}`,
            );
            setSortProp(sortableField);
            setDescProp(desc);
          }
        }}
        sortServerSide
        data={(useFilterData ? filterData : data)
          .slice()
          .sort((a, b) => sortData(a, b, sortProp, descProp))}
      />
    </TableContainer>
  );
};

export default MyBusiness;
