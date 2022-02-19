/* istanbul ignore file */

import React from 'react';
import { SomaIcon } from '@soma/react';

export const DEFAULT_COLUMNS = [
  {
    hide: false,
    Header: <SomaIcon size="sm" icon="star-fill" color="#C8CACD" />,
    accessor: 'fav',
    width: 100,
  },
  {
    hide: false,
    Header: 'Ticker',
    accessor: 'ticker',
    width: 120,
  },
  {
    hide: false,
    Header: 'Emissor/Risco',
    accessor: 'formattedEmitter',
    width: 140,
    align: 'flex-start',
  },
  {
    hide: false,
    Header: 'Vencimento',
    width: 100,
    accessor: 'formattedDate',
  },
  {
    hide: false,
    width: 100,
    Header: 'Duration',
    accessor: 'formattedDuration',
  },
  {
    hide: false,
    width: 90,
    Header: 'Anbima',
    accessor: 'formattedAnbima',
  },
  {
    hide: false,
    width: 100,
    Header: 'B Ref',
    accessor: 'ntnbTicker',
  },
  {
    hide: false,
    width: 120,
    Header: 'Emissão',
    accessor: 'formattedRemuneration',
  },
  {
    hide: false,
    width: 100,
    Header: 'Rating',
    accessor: 'rating',
  },
  {
    hide: true,
    Header: 'BreakEven',
    accessor: 'breakEven',
    width: 100,
  },
  {
    hide: false,
    border: {
      color: '#36B243',
    },
    Header: 'Compra',
    accessor: 'bid',
    columns: [
      {
        Header: 'Volume',
        width: 120,
        accessor: 'bidFinancialVolume',
      },
      {
        Header: 'Quantidade',
        width: 120,
        accessor: 'bidQuantity',
      },
      {
        Header: 'BID',
        width: 120,
        accessor: 'bidFee',
      },
    ],
  },
  {
    hide: false,
    Header: 'Venda',
    accessor: 'offer',
    border: {
      color: '#3DA0E6',
    },
    columns: [
      {
        Header: 'OFFER',
        accessor: 'offerFee',
        width: 120,
      },
      {
        Header: 'Quantidade',
        accessor: 'offerQuantity',
        width: 120,
      },
      {
        Header: 'Volume',
        width: 120,
        accessor: 'offerFinancialVolume',
      },
    ],
  },
  {
    hide: false,
    Header: 'Ação',
    accessor: 'negociate',
    width: 120,
    minWidth: 120,
  },
];

export const COLUMNS_SEND_OFFER = [
  {
    hide: false,
    Header: <SomaIcon size="sm" icon="star-fill" color="#C8CACD" />,
    accessor: 'fav',
    width: 100,
  },
  {
    hide: false,
    Header: 'Ticker',
    accessor: 'ticker',
    width: 120,
  },
  {
    hide: false,
    Header: 'Emissor/Risco',
    accessor: 'formattedEmitter',
    width: 140,
    align: 'flex-start',
  },
  {
    hide: false,
    Header: 'Vencimento',
    width: 100,
    accessor: 'formattedDate',
  },
  {
    hide: false,
    width: 100,
    Header: 'Duration',
    accessor: 'formattedDuration',
  },
  {
    hide: false,
    width: 90,
    Header: 'Anbima',
    accessor: 'formattedAnbima',
  },
  {
    hide: false,
    width: 100,
    Header: 'B Ref',
    accessor: 'ntnbTicker',
  },
  {
    hide: false,
    width: 120,
    Header: 'Emissão',
    accessor: 'formattedRemuneration',
  },
  {
    hide: false,
    width: 100,
    Header: 'Rating',
    accessor: 'rating',
  },
  {
    hide: true,
    Header: 'BreakEven',
    accessor: 'breakEven',
    width: 100,
  },
  {
    hide: false,
    border: {
      color: '#36B243',
    },
    Header: 'Compra',
    accessor: 'bid',
    columns: [
      {
        Header: '',
        width: 20,
        accessor: 'bidActions',
      },
      {
        accessor: 'bidFinancialVolume',
        Header: 'Volume',
        width: 120,
        margin: 0,
      },
      {
        accessor: 'bidQuantity',
        Header: 'Quantidade',
        width: 120,
        margin: 0,
      },
      {
        accessor: 'bidFee',
        Header: 'BID',
        width: 120,
        margin: 0,
      },
    ],
  },
  {
    hide: false,
    Header: 'Venda',
    accessor: 'offer',
    border: {
      color: '#3DA0E6',
    },
    columns: [
      {
        accessor: 'offerFee',
        Header: 'OFFER',
        width: 120,
        margin: 0,
      },
      {
        accessor: 'offerQuantity',
        Header: 'Quantidade',
        width: 120,
        margin: 0,
      },
      {
        accessor: 'offerFinancialVolume',
        Header: 'Volume',
        width: 120,
        margin: 0,
      },
      {
        Header: '',
        width: 20,
        accessor: 'offerActions',
      },
    ],
  },
  {
    hide: false,
    Header: 'Ação',
    accessor: 'negociate',
    minWidth: 120,
    width: 120,
  },
];
export default DEFAULT_COLUMNS;
