import { TSortableDictionary, TRevertSortableDictionary, TDictionarySideTransation } from '../../typing/table';

export const ORDER_SIDE_TRANSACTION = {
  Offer: 1,
  Bid: 2,
};

export const DICTIONARY_SIDE_TRANSACTION: TDictionarySideTransation = {
  1: 'Venda',
  2: 'Compra',
};

export const SOCKET_CONNECTIONS_TYPES = {
  OFFER_AGGRESSION_RUN: 3,
  ASSETS_RUN_RESULT: 1,
  FILTER_ORDERBY: 2,
  REMOVE_ALL_OFFERS_RUN: 10,
  MARKET_BUSINESS_CANCEL_ITEM: 11,
  INPUT_DATA: 12,
  REMOVE_OFFER_RUN: 13,
};

export const sortableDictionary: TSortableDictionary = {
  fav: 'isFavorite',
  formattedEmitter: 'emitter',
  formattedDate: 'maturityDate',
  formattedDuration: 'duration',
  offerFinancialVolume: 'offer.finantialVolume',
  offerQuantity: 'offer.quantity',
  offerFee: 'offer.fee',
  bidFinancialVolume: 'bid.finantialVolume',
  bidQuantity: 'bid.quantity',
  bidFee: 'bid.fee',
  formattedRemuneration: 'remuneration',
  formattedAnbima: 'anbima',
};

export const revertSortableDictionary: TRevertSortableDictionary = {
  isFavorite: 'fav',
  emitter: 'formattedEmitter',
  maturityDate: 'formattedDate',
  duration: 'formattedDuration',
  'offer.finantialVolume': 'offerFinancialVolume',
  'offer.quantity': 'offerQuantity',
  'offer.fee': 'offerFee',
  'bid.finantialVolume': 'bidFinancialVolume',
  'bid.quantity': 'bidQuantity',
  'bid.fee': 'bidFee',
  remuneration: 'formattedRemuneration',
  anbima: 'formattedAnbima',
};

export const sortableDictionaryMyBusiness: TSortableDictionary = {
  formattedDirection: 'side',
  formattedStatus: 'status',
  formattedMaturityDate: 'maturityDate',
  formattedFinancialVolume: 'finantialVolume',
  formattedSellFinalFinancialVolume: 'sellFinantialVolume',
  formattedBuyFinalFinancialVolume: 'buyFinantialVolume',
  formattedDate: 'date',
  formattedUnitPrice: 'unitPrice',
};

export const STATUS_DICTIONARY = {
  CONFIRMED: 1,
  CANCELED: 2,
  RECONFIRMED: 3,
};

export const TABS = {
  MY_BUSINESS: 'my-business',
  MARKET_BUSINESS: 'market-business',
};

export const COMPONENTS_BY_PROFILE = {
  MARKET_BUSINESS: 'MarketBusiness',
  MARKET_BUSINESS_FROM_TRADER: 'MarketBusinessFromTrader',
  MY_BUSINESS: 'MyBusiness',
};
