import axios, { AxiosRequestConfig } from 'axios';
import constants from '../../config/constants';

const { SUBSCRIPTION_KEY } = constants;

type TExportExcel = {
  url: string;
  token: string;
  filename: string;
};

const exportExcel = ({ url, token, filename }: TExportExcel) => {
  const instance = axios.create({
    timeout: 10000,
  });

  const opt: AxiosRequestConfig = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Ocp-Apim-Subscription-Key': SUBSCRIPTION_KEY,
    },
    responseType: 'blob',
  };
  instance(url, opt)
    .then((response: any) => {
      const urlAux = window.URL.createObjectURL(response.data);
      const link = document.createElement('a');
      link.href = urlAux;
      link.setAttribute('download', `${filename}.csv`);
      document.body.appendChild(link);
      link.click();
    })
    .catch((error: any) => {
      throw new Error(error);
    });
};

const utilExcel = {
  exportExcel,
};

export default utilExcel;
