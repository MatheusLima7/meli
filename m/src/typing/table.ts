/* istanbul ignore file */

import { ReactElement } from 'react';

type TBid = {
  fee: number;
  quantity: number;
  finantialVolume: number;
  finalFinantialVolume: number;
  liquidation: number;
  finalFee: number;
  unitPrice: number;
  finalUnitPrice: number;
  isSelf: boolean;
};

type TOffer = {
  fee: number;
  quantity: number;
  finantialVolume: number;
  finalFinantialVolume: number;
  liquidation: number;
  finalFee: number;
  unitPrice: number;
  finalUnitPrice: number;
  isSelf: boolean;
};

export type TFilterTable = {
  isOpennedBlottler: boolean;
  data: TItemTableResponse[];
  selectedItemRun: TSelectedTtem | undefined;
  defaultColumns: Array<any>,
  isSendOffer: boolean,
  context: any,
}

export type TSortColumn = {
  Field?: string;
  Direction?: string;
};

export type TSelectedTtem = {
  prop: string;
  value: string;
  backgroundColor?: string;
  name?: string;
}

export type TItemTable = {
  id: string;
  ticker: string;
  ntnbTicker: string; // BREF
  maturityDate: string; // vencimento
  duration: number;
  breakEven: number;
  anbima: number;
  remuneration: number; // emissão
  emitter: string; // emissor
  rating: string;
  isFavorite: boolean;
  bid: TBid;
  offer: TOffer;
  indexName: string;
};

export type TFormattedAttributes = {
  formattedAnbima: string;
  formattedDuration: string;
};

export type TMapData = {
  [ticker: string]: TObjectMapData;
}

export type TObjectMapData = {
  bidFee?: number | null;
  bidQuantity?: number | null;
  bidVolume?: number | null;
  bidPU?: number | null;
  offerFee?: number | null;
  offerQuantity?: number | null;
  offerVolume?: number | null;
  updatedFields: string[];
  offerPU?: number | null;
  fieldsError: string[];
  localizationFocus: string | null;
  localizationMessage: string | null;
  message: string | null;
  type: string | null;
}

export type TItemTableResponse = {
  fav: ReactElement;
  id: string;
  emitter: string;
  isFavorite: boolean;
  ticker: string;
  formattedEmitter: ReactElement;
  maturityDate: string;
  formattedDate: string;
  duration: number;
  formattedDuration: string;
  anbima: number;
  formattedAnbima: string;
  ntnbTicker: string;
  remuneration: number;
  rating: string;
  breakEven: string;
  bid: TBid;
  offer: TOffer;
  negociate: ReactElement;
  formattedRemuneration: string;
  indexName: string;
  index: number;
  offerFee?: ReactElement;
  offerQuantity?: ReactElement;
  bidQuantity?: ReactElement;
  bidFee?: ReactElement;
  bidFinancialVolume?: ReactElement | string;
  offerFinancialVolume?: ReactElement | string;
}

export type TColumns = {
  Header: any;
  sticky?: string;
  accessor?: string;
  columns?: TColumns[];
  value?: string;
  hide?: boolean;
  isEmptyColumn?: boolean;
  width?: number;
};

export type TTableReducer = {
  data: TItemTable[];
  title: string;
  message: string;
  success: boolean;
  error: boolean;
  loading: boolean;
  currentPageNumber: number;
  currentPageSize: number;
  totalPages: number;
  totalRows: number;
  ticker: string;
};

export type TStateReducer = {
  table: TTableReducer;
};

export type TSortableDictionary = {
  [key: string]: string;
};

export type TRevertSortableDictionary = {
  [key: string]: string;
};

export type TSortBy = {
  id: string;
  desc: boolean;
}

export type TDictionarySideTransation= {
  [key: number]: string;
};

export type TRow = {
  getPU: (ticker: string, fee: number) => Promise<number | undefined>;
  id: string;
  emitter: string;
  isFavorite: boolean;
  ticker: string;
  maturityDate: string;
  duration: number;
  anbima: number;
  ntnbTicker: string;
  remuneration: number;
  rating: string;
  breakEven: string;
  bid: TBid;
  offer: TOffer;
  negociate: ReactElement;
  indexName: string;
  index: number;
  isSendOffer: boolean;
  handle: any;
}
