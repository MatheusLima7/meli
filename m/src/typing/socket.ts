/* istanbul ignore file */

import { ReactNode } from 'react';
import { HubConnection } from '@microsoft/signalr';
import { TSortColumn } from './table';

export interface ISocketState {
  setConfigByComponent: (component: string) => void;
  connection?: HubConnection;
  connected: boolean;
  message?: string;
}

export interface ISocketProviderProps {
  children: ReactNode;
}

type TFilter = {
  AssetTypes: string[];
  Indexes: string[];
  IsExempt: boolean | null;
  Overdue: boolean | null,
  IsFavorite: boolean | null,
  Search: string;
};

export type TCommandData = {
  InitialFilterParams?: TFilter;
  InitialOrderParams?: TSortColumn | null;
}
