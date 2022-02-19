/* istanbul ignore file */

const DEFAULT_COLUMNS = [
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

export default DEFAULT_COLUMNS;
