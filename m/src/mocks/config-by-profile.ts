import { COMPONENTS_BY_PROFILE } from '../utils/enum';

export type TConfigByProfile = {
  isMounted: boolean;
  name: string;
  id: number;
}

const configByProfile = [
  {
    name: COMPONENTS_BY_PROFILE.MARKET_BUSINESS,
    id: 2,
    isMounted: false,
  },
  {
    name: COMPONENTS_BY_PROFILE.MARKET_BUSINESS_FROM_TRADER,
    id: 1,
    isMounted: false,
  },
  {
    name: COMPONENTS_BY_PROFILE.MY_BUSINESS,
    id: 1,
    isMounted: false,
  },
];

export default configByProfile;
