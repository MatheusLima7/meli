import storage from '../storage';
import { revertSortableDictionary } from '../enum';

export const sortData = (
  a: any,
  b: any,
  prop: string,
  desc: boolean,
) => {
  if (a[prop] < b[prop]) {
    return desc ? 1 : -1;
  }
  if (a[prop] > b[prop]) {
    return desc ? -1 : 1;
  }
  return 0;
};

export const getSortByObjectFromTable = () => {
  const { get } = storage('localStorage');
  const orderParams = { ...JSON.parse(get('OrderParams')) };
  if (orderParams) {
    orderParams.id = revertSortableDictionary[orderParams.Field] || orderParams.Field;
    orderParams.desc = orderParams.Direction === 'Desc';
    delete orderParams.Field;
    delete orderParams.Direction;
  }
  return orderParams;
};

export default {
  sortData,
  getSortByObjectFromTable,
};
