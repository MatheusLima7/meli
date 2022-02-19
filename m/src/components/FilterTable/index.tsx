/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
import React, {
  useCallback,
  useContext,
  useEffect,
  useState,
  useRef,
} from 'react';
import { Table } from '@xpinc-otc/table';

import {
  TableRunContainer,
  MessageContent,
  TableContainer,
  TableRun,
} from './styles';
import Filters from '../Filters';
import {
  favoriteCheckboxes,
  indexerCheckboxes,
  assetTypes,
  exemptRadios,
} from '../../mocks/filters';
import GroupRadio from '../GroupRadio';
import GroupCheckbox from '../GroupCheckbox';
import {
  TColumns,
  TSortColumn,
  TFilterTable,
  TSortBy,
} from '../../typing/table';
import { sortableDictionary, SOCKET_CONNECTIONS_TYPES } from '../../utils/enum';
import { THandleFilter } from '../../typing/filters';
import storage from '../../utils/storage';
import utilColumns from '../../utils/columns';
import utilFilters from '../../utils/filters';
import utilSort from '../../utils/sort';
import HeaderTable from '../HeaderTable';
import BodyTable from '../BodyTable';
import utilGoogleAnalitycs from '../../utils/ga';
import { ServicesContext } from '../../services';

const FilterTable = ({
  isOpennedBlottler,
  defaultColumns,
  selectedItemRun,
  isSendOffer,
  context,
  data,
}: TFilterTable) => {
  const [filterAssetTypes, setFilterAssetTypes] = useState<any>([]);
  const [filterIndexes, setFilterIndexes] = useState<any>([]);
  const [filterIsExempt, setFilterIsExempt] = useState<any>(null);
  const [filterFavorites, setFilterFavorites] = useState<any>(null);
  const [search, setSearch] = useState<string>('');
  const [customColumns, setCustomColumns] = useState<any>(defaultColumns);
  const [customTableColumns, setCustomTableColumns] = useState<any>(defaultColumns);
  const [sortColumn, setSortColumn] = useState<TSortColumn | null | undefined>(null);
  const [loadingText, setLoadingText] = useState<string | undefined>();
  const [mounted, setMounted] = useState<boolean>(false);
  const [defaultSortByItem, setDefaultSortByItem] = useState<TSortBy | null>(null);
  const { connection, connected } = context;
  const service = useContext(ServicesContext);
  const { set: setLocalStorage, get: getLocalStorage, remove: removeLocalStorage } = storage('localStorage');

  const ref: any = useRef();

  const editColumns = (columns: TColumns[]) => {
    const currentColumns = utilColumns.formatVisibleColumns(columns);
    const stringVisibleColumns = utilColumns.getStringVisibleColumns(currentColumns);
    setLocalStorage('CustomColumns', stringVisibleColumns);
    setCustomColumns(currentColumns);
    const filtered = utilColumns.setColumnWidth(ref, currentColumns, false);
    setCustomTableColumns(filtered);
  };

  useEffect(() => {
    const savedColumns = getLocalStorage('CustomColumns');
    const currentColumns = utilColumns.formatVisibleColumns(defaultColumns, savedColumns);
    setCustomColumns(currentColumns);

    const cachedResizeColumns = getLocalStorage('ResizeTableRun');
    const filtered = utilColumns.setColumnWidth(ref, currentColumns, false, cachedResizeColumns);
    setCustomTableColumns(filtered);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handle = useCallback(
    (command, callback): void => {
      if (connected && connection) {
        connection
          .invoke('Handle', command)
          .then(() => {
            if (callback) callback();
          })
          .catch((err: any) => {
            // eslint-disable-next-line no-console
            console.error(err);
          })
          .finally();
      }
    },
    [connected, connection],
  );

  const getObjectSortBy = (sortBy: Array<{ id: string; desc: boolean }>) => ({
    Field: sortableDictionary[sortBy[0].id] || sortBy[0].id,
    Direction: sortBy[0].desc ? 'Desc' : 'Asc',
  });

  useEffect(() => {
    if (connected && connection && mounted) {
      setLoadingText(loadingText ? 'Filtrando...' : 'Carregando...');
      const filter = utilFilters.getFilter(false);
      const orderParams: TSortColumn | null = sortColumn?.Field === ''
        || sortColumn?.Direction === '' || sortColumn === undefined
        ? null
        : sortColumn;
      handle(
        {
          Type: SOCKET_CONNECTIONS_TYPES.FILTER_ORDERBY,
          CommandData: {
            Filter: filter,
            OrderParams: orderParams,
          },
        },
        null,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    filterAssetTypes,
    filterIndexes,
    filterIsExempt,
    filterFavorites,
    search,
    sortColumn,
  ]);

  const setSearchValue = (_: string, value: string) => {
    setSearch(value || '');
  };

  function handleFilter({
    filterName, setCustomFilter, isArray,
  }: THandleFilter) {
    return (value: string | null) => {
      const filterStorage = JSON.parse(getLocalStorage('Filter'));
      const customFilter = filterStorage[filterName];
      if (isArray && value) {
        const hasValueInFilter = customFilter.includes(value);
        if (!hasValueInFilter) {
          const nextFilter = customFilter.concat(value);
          setCustomFilter(nextFilter);
        } else {
          const nextFilter = customFilter.filter((item: any) => item !== value);
          setCustomFilter(nextFilter);
        }
      } else {
        const currentValue = filterName === 'IsFavorite'
          ? String(!(customFilter === true))
          : value;
        setCustomFilter(currentValue);
      }
    };
  }

  const filterDictionary: any = {
    AssetTypes: handleFilter({
      filterName: 'AssetTypes', setCustomFilter: setFilterAssetTypes, isArray: true,
    }),
    IsExempt: handleFilter({
      filterName: 'IsExempt', setCustomFilter: setFilterIsExempt, isArray: false,
    }),
    Indexes: handleFilter({
      filterName: 'Indexes', setCustomFilter: setFilterIndexes, isArray: true,
    }),
    IsFavorite: handleFilter({
      filterName: 'IsFavorite', setCustomFilter: setFilterFavorites, isArray: false,
    }),
  };

  const setFilter = (property: string, value: string) => {
    let customValue: string | null = value;
    if (property === 'IsExempt') {
      customValue = (value === 'all' ? null : value);
    }
    filterDictionary[property](customValue, property);
  };

  useEffect(() => {
    Promise.all([
      setFilterAssetTypes(utilFilters.getFilterValueByPropertyName('AssetTypes')),
      setFilterIsExempt(utilFilters.getFilterValueByPropertyName('IsExempt')),
      setFilterIndexes(utilFilters.getFilterValueByPropertyName('Indexes')),
      setFilterFavorites(utilFilters.getFilterValueByPropertyName('IsFavorite')),
    ]).then(() => {
      setMounted(true);
      setDefaultSortByItem(utilSort.getSortByObjectFromTable());
    });
  }, []);

  const setInfoResizing = (key: string, value: number) => {
    if (key && value) {
      const cachedResizeColumns = getLocalStorage('ResizeTableRun');
      const resizeColumns = JSON.parse(cachedResizeColumns) || {};
      resizeColumns[key] = value;
      setLocalStorage('ResizeTableRun', JSON.stringify(resizeColumns));
    }
  };

  const setInfoResizingGroup = (info: { [key: string]: number }) => {
    if (JSON.stringify(info) !== '{}') {
      setLocalStorage('ResizeTableRun', JSON.stringify(info));
    }
  };

  return (
    <TableRunContainer
      data-testid="home-table"
      isOpenedBlotter={isOpennedBlottler}
    >
      <Filters
        filterOptions={[
          { Component: GroupCheckbox, data: favoriteCheckboxes, id: 'favoriteCheckboxes' },
          { Component: GroupCheckbox, data: assetTypes, id: 'assetTypes' },
          { Component: GroupCheckbox, data: indexerCheckboxes, id: 'indexerCheckboxes' },
          { Component: GroupRadio, data: exemptRadios, id: 'exemptRadios' },
        ]}
        setFilter={setFilter}
        setSearch={setSearchValue}
        columns={customColumns}
        editColumns={editColumns}
      />
      {!!data && data.length ? (
        <TableContainer
          ref={ref}
          data-testid="table-container"
        >
          {
          isSendOffer
            ? (
              <TableRun data-testid="table-component" cellSpacing={0}>
                <HeaderTable
                  columns={customTableColumns}
                  setInfoResizing={setInfoResizing}
                  defaultSortByItem={defaultSortByItem}
                  asyncSortByFn={(sortBy: Array<{ id: string; desc: boolean }>) => {
                    const currentSortColumn = sortBy?.length ? getObjectSortBy(sortBy) : undefined;
                    setSortColumn(currentSortColumn);
                    if (currentSortColumn) {
                      utilGoogleAnalitycs.setGA(
                        'event',
                        'Ordenação na Tabela Principal do RUN',
                        `Campo: ${currentSortColumn.Field}, Direção: ${currentSortColumn.Direction}`,
                      );
                      setLocalStorage('OrderParams', JSON.stringify(currentSortColumn));
                    } else {
                      removeLocalStorage('OrderParams');
                    }
                  }}
                />
                <BodyTable
                  columns={customTableColumns}
                  isSendOffer={isSendOffer}
                  getPU={service.getPU}
                  handle={handle}
                  data={data}
                />
              </TableRun>
            )
            : (
              <>
                {data && data.length
                  ? (
                    <Table
                      setInfoResizing={setInfoResizingGroup}
                      selectedItem={selectedItemRun}
                      asyncSortByFn={(sortBy: Array<{ id: string; desc: boolean }>) => {
                        const currentSortColumn = sortBy?.length
                          ? getObjectSortBy(sortBy) : undefined;
                        setSortColumn(currentSortColumn);
                        if (currentSortColumn) {
                          utilGoogleAnalitycs.setGA(
                            'event',
                            'Ordenação na Tabela Principal do RUN',
                            `Campo: ${currentSortColumn.Field}, Direção: ${currentSortColumn.Direction}`,
                          );
                          setLocalStorage('OrderParams', JSON.stringify(currentSortColumn));
                        } else {
                          removeLocalStorage('OrderParams');
                        }
                      }}
                      columns={customTableColumns}
                      loadingText={loadingText}
                      loading={false}
                      sortServerSide
                      data={data}
                      defaultSortByItem={defaultSortByItem}
                    />
                  )
                  : (<MessageContent><span>Nenhum dado foi encontrado</span></MessageContent>)}
              </>
            )
        }
        </TableContainer>
      ) : (
        <MessageContent><span>Nenhum dado foi encontrado</span></MessageContent>
      )}

    </TableRunContainer>
  );
};

export default FilterTable;
