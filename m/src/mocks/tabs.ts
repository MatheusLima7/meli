/* istanbul ignore file */
import { TABS } from '../utils/enum';

export type TTab = {
  name: string;
  label: string;
}

const DEFAULT_TABS: TTab[] = [
  {
    name: TABS.MY_BUSINESS,
    label: 'Meus Negócios',
  },
  {
    name: TABS.MARKET_BUSINESS,
    label: 'Negócios do Mercado',
  },
];

export default DEFAULT_TABS;
