import { TUser } from '../../hooks/useAuthenticate';

export const ACCESS_TYPES = {
  BROKER: {
    label: 'Broker',
    value: 2,
  },
  TRADER: {
    label: 'Trader',
    value: 1,
  },
  SEND_OFFER: {
    label: 'SendOffer',
    value: 3,
  },
};

export const verifyAccess = (user: TUser | undefined, typeAccess: number) => (
  !!user && !!user.features.find((feature) => feature === typeAccess)
);
