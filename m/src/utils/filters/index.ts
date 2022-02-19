import storage from '../storage';

const DEFAULT_FILTER = {
  AssetTypes: [],
  Indexes: [],
  IsExempt: null,
  IsFavorite: null,
  Overdue: false,
  Search: '',
};

type TValue = boolean | null | string;

const getFilterSettingValueByPropertyName = (filter: any, value: TValue, name: string) => {
  const nextFilter = filter;

  if (name === 'AssetTypes' || name === 'Indexes') {
    const hasValueInFilter = nextFilter[name].includes(value);
    if (!hasValueInFilter) {
      nextFilter[name] = nextFilter[name].concat(value);
      return nextFilter;
    }
    nextFilter[name] = nextFilter[name].filter((item: any) => item !== value);
    return nextFilter;
  }

  if (name === 'IsExempt') {
    nextFilter[name] = value === 'all' ? null : !!(value === 'true');
    return nextFilter;
  }

  if (name === 'IsFavorite') {
    nextFilter[name] = nextFilter[name] === null || null;
    return nextFilter;
  }

  nextFilter[name] = value;
  return nextFilter;
};

const getFilterValueByPropertyName = (name: string) => {
  const { get } = storage('localStorage');
  let filter = JSON.parse(get('Filter'));
  if (!filter) {
    filter = DEFAULT_FILTER;
  }

  return filter[name];
};

const getFilter = (initial: boolean) => {
  const { get } = storage('localStorage');
  let filter = JSON.parse(get('Filter'));

  if (!filter) {
    filter = DEFAULT_FILTER;
  }

  if (initial) {
    filter.Search = '';
    setFilter('Search', '');
  }

  return filter;
};

const setFilter = (name: string, value: TValue) => {
  const { get, set } = storage('localStorage');
  let filter: any = JSON.parse(get('Filter'));
  if (!filter) {
    filter = DEFAULT_FILTER;
  }

  filter = getFilterSettingValueByPropertyName(filter, value, name);
  set('Filter', JSON.stringify(filter));
};

const getFilterRadio = (name: string, value: boolean | null | string, defaultChecked: boolean) => {
  const { get } = storage('localStorage');
  const filter = JSON.parse(get('Filter'));
  const filterName = filter && filter[name];

  if (filter) {
    if (filterName === null && value === 'all') {
      return true;
    }
    return value === String(filterName);
  }

  return defaultChecked || false;
};

const getFilterCheckbox = (
  name: string, value: boolean | null | string, defaultChecked: boolean,
) => {
  const { get } = storage('localStorage');
  const filter = JSON.parse(get('Filter'));
  let checked = defaultChecked;

  if (filter) {
    checked = (name === 'IsFavorite') ? filter[name] : filter[name].includes(value);
  }

  return checked || false;
};

export default {
  setFilter,
  getFilter,
  getFilterRadio,
  getFilterValueByPropertyName,
  getFilterSettingValueByPropertyName,
  getFilterCheckbox,
};
