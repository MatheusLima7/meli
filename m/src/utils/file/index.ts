import { formatDateDictionary } from '../date';

export const createFileName = (specificName: string) => {
  const dateNow = new Date();
  const month = formatDateDictionary.MMMM();
  return `${specificName}-${formatDateDictionary.DD(dateNow)}-${month[0].toUpperCase() + month.slice(1, 3)}-${dateNow.getFullYear()}`;
};

export default createFileName;
