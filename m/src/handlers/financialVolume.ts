import axios from 'axios';

import constants from '../config/constants';
import utilHeaders from '../utils/headers';
import useDebounce from '../hooks/useDebounce';
import { TMapData } from '../typing/table';

const { API } = constants;

const dataHandler = () => {
  const getPU = async (ticker: string, fee: number): Promise<number | undefined> => {
    const config: any = {
      method: 'POST',
      headers: utilHeaders.DEFAULT_HEADER,
      data: {
        liquidation: 1,
        value: fee,
        ticker,
      },
    };
    return axios(
      `${API}/api/Asset/calculate-price`,
      config,
    )
      .then((response) => {
        if (response.data && response.data) {
          const { puCalculated } = response.data.data;
          return puCalculated;
        }
        return null;
      }).catch((err) => {
        // eslint-disable-next-line no-console
        console.error(err);
        return null;
      });
  };

  const handlerChange = async ({
    volumeRef,
    quantity,
    puParam,
    fetchPU,
    mapData,
    ticker,
    fee,
  }: {
    puParam: 'bidPU' | 'offerPU',
    quantity?: number,
    mapData: TMapData,
    fetchPU: boolean,
    ticker: string,
    volumeRef: any,
    fee?: number,
    pu?: number,
  }) => {
    let pu;
    await useDebounce.dispatch(async () => {
      volumeRef.setValue(null, fetchPU);
      let result = null;
      if (fetchPU) {
        if (fee && quantity) {
          pu = await getPU(ticker, fee);
          if (pu) {
            result = pu * quantity;
          }
          // eslint-disable-next-line no-param-reassign
          mapData[ticker][puParam] = pu;
        }
      } else {
        pu = mapData[ticker][puParam];
        if (pu && quantity) {
          result = pu * quantity;
        }
      }
      volumeRef.setValue(result);
    });
  };

  return {
    handlerChange,
  };
};

export default dataHandler;
