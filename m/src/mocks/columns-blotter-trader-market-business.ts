/* istanbul ignore file */

const DEFAULT_COLUMNS_TRADER_MARKET_BUSINESS = [
  {
    hide: false,
    Header: 'Executado em',
    width: 120,
    accessor: 'formattedDate',
  },
  {
    hide: false,
    Header: 'Ativo',
    accessor: 'ticker',
    width: 200,
  },
  {
    hide: false,
    Header: 'Direção',
    accessor: 'formattedDirection',
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
    Header: 'Taxa Bruta',
    accessor: 'formattedFee',
    width: 106,
  },
];

export default DEFAULT_COLUMNS_TRADER_MARKET_BUSINESS;
