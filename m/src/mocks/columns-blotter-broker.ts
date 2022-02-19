/* istanbul ignore file */
const DEFAULT_COLUMNS_BROKER = [
  {
    hide: false,
    Header: 'Comprador',
    accessor: 'buyer',
    width: 130,
  },
  {
    hide: false,
    Header: 'PU Final Comprador',
    width: 130,
    accessor: 'formattedBuyUnitPrice',
  },
  {
    hide: false,
    Header: 'Financeiro Final Comprador',
    width: 190,
    accessor: 'formattedBuyFinalFinancialVolume',
  },
  {
    hide: false,
    Header: 'Vendedor',
    width: 130,
    accessor: 'seller',
  },
  {
    hide: false,
    Header: 'PU Final Vendedor',
    width: 130,
    accessor: 'formattedSellUnitPrice',
  },
  {
    hide: false,
    Header: 'Financeiro Final Vendedor',
    width: 190,
    accessor: 'formattedSellFinalFinancialVolume',
  },
];

export default DEFAULT_COLUMNS_BROKER;
