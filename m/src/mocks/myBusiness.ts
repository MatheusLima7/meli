/* istanbul ignore file */

export const mockRequestMyBusiness: Array<any> = [
  {
    tradeId: '022397c4-5019-4299-ac14-6c523ea9a0d1',
    ticker: 'CRA019001E7',
    maturityDate: '2029-03-15T00:00:00',
    quantity: 1200.00000000,
    side: 1,
    fee: 4.83000000,
    unitPrice: 1042.54482300,
    finantialVolume: 1251053.7876000000000000,
    date: '2021-11-19T15:35:50.283',
    status: 1,
  },
  {
    tradeId: '73051526-7973-4afc-828d-f90479682b5d',
    ticker: 'COCE27',
    maturityDate: '2024-03-15T00:00:00',
    quantity: 500.00000000,
    side: 2,
    fee: 5.12000000,
    unitPrice: 1193.87374100,
    finantialVolume: 596936.8705000000000000,
    date: '2021-11-19T15:12:10.183',
    status: 1,
  },
  {
    tradeId: 'bcded109-2970-4afb-b440-85d80449bff2',
    ticker: 'CRA017008SS',
    maturityDate: '2024-12-16T00:00:00',
    quantity: 1.00000000,
    side: 2,
    fee: 5.65000000,
    unitPrice: 1111.05077300,
    finantialVolume: 1111.0507730000000000,
    date: '2021-11-19T14:13:14.03',
    status: 1,
  },
];

export const mockColumns: Array<any> = [
  {
    hide: false,
    Header: 'Ticker',
    accessor: 'ticker',
    width: 100,
  },
  {
    hide: false,
    Header: 'Vencimento',
    width: 92,
    accessor: 'formattedMaturityDate',
  },
  {
    hide: false,
    Header: 'Direção',
    accessor: 'formattedDirection',
    width: 106,
  },
  {
    hide: false,
    Header: 'Taxa Bruta',
    accessor: 'formattedFee',
    width: 106,
  },
  {
    hide: false,
    Header: 'Taxa Final',
    accessor: 'formattedFinalFee',
    width: 106,
  },
  {
    hide: false,
    Header: 'Quantidade',
    accessor: 'quantity',
    width: 106,
  },
  {
    hide: false,
    Header: 'PU Final',
    accessor: 'formattedUnitPrice',
    width: 106,
  },
  {
    hide: false,
    Header: 'Financeiro Final',
    accessor: 'formattedFinancialVolume',
    width: 106,
  },
  {
    hide: false,
    Header: 'Solicitado em',
    accessor: 'formattedDate',
    width: 106,
  },
  {
    hide: false,
    Header: 'Status',
    accessor: 'formattedStatus',
    width: 106,
  },
];
