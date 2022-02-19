/* istanbul ignore file */

import { ReactElement } from 'react';

export type TBlotterData = {
  date: string;
  formattedDate?: string;
  fee: number;
  formattedFee?: string;
  finantialVolume: number;
  formattedFinancialVolume?: string;
  buyFinalFinantialVolume: number;
  formattedBuyFinalFinancialVolume?: string;
  sellFinalFinantialVolume: number;
  formattedSellFinalFinancialVolume?: string;
  maturityDate: string;
  formattedMaturityDate?: string;
  side: number;
  formattedSide?: string;
  status: number;
  ticker: string;
  tradeId: string;
  unitPrice: number;
  formattedUnitPrice?: ReactElement;
  buyFinalUnitPrice: number;
  formattedBuyFinalUnitPrice?: ReactElement;
  sellFinalUnitPrice: number;
  formattedSellFinalUnitPrice?: ReactElement;
  formattedStatus?: ReactElement;
  formattedDirection?: ReactElement;
  finalFee: number;
  finalUnitPrice: number;
  finalFinantialVolume: number;
  formattedFinalFee?: string;
  buyer?: string;
  buyerId?: string;
  seller?: string;
  sellerId?: string;
  cancel?: ReactElement | string;
  quantity?: number;
};

export type TMyBusiness = {
  open: boolean;
  search?: string;
  active?: boolean;
};

export type TColorOption = {
  name: string;
  color: string;
};

export type TColorDictionary = {
  name: string;
  value: number;
  color: string;
};
