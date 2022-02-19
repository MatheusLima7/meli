import { TGlobalNotificationContext } from '../hooks/useGlobalNotification';
import API from './api';

const assetService = (notification: TGlobalNotificationContext) => ({
  getPU: async (ticker: string, fee: number): Promise<number | undefined> => {
    const data = await API.post({
      url: '/api/Asset/calculate-price',
      params: {
        liquidation: 1,
        value: fee,
        ticker,
      },
    });
    if (data.error) {
      notification.add({
        title: 'Não foi possível calcular o volume!',
        message: 'Mas você pode seguir a sua operação normalmente.',
        type: 'error',
      });
      return undefined;
    }
    return data?.data?.puCalculated;
  },
});

export default assetService;
