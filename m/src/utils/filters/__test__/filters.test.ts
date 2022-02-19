import utilFilter from '..';

const filter = {
  AssetTypes: [],
  Indexes: [],
  IsExempt: null,
  IsFavorite: null,
  Overdue: false,
  Search: '',
};

describe('Get Filter', () => {
  it('Set AssetTypes value in empty filter', () => {
    expect(utilFilter.getFilterSettingValueByPropertyName(filter, 'DEB', 'AssetTypes')).toEqual({
      AssetTypes: ['DEB'], Indexes: [], IsExempt: null, IsFavorite: null, Overdue: false, Search: '',
    });
  });

  it('Remove Indexes value in filter if exist the value in array', () => {
    expect(utilFilter.getFilterSettingValueByPropertyName({
      AssetTypes: [],
      Indexes: ['DI+', '% DI'],
      IsExempt: null,
      IsFavorite: null,
      Overdue: false,
      Search: '',
    }, '% DI', 'Indexes')).toEqual({
      AssetTypes: [], Indexes: ['DI+'], IsExempt: null, IsFavorite: null, Overdue: false, Search: '',
    });
  });

  it('Toggle IsFavorite Item between null and true', () => {
    expect(utilFilter.getFilterSettingValueByPropertyName({
      AssetTypes: [],
      Indexes: [],
      IsExempt: null,
      IsFavorite: null,
      Overdue: false,
      Search: '',
    }, '', 'IsFavorite')).toEqual({
      AssetTypes: [], Indexes: [], IsExempt: null, IsFavorite: true, Overdue: false, Search: '',
    });

    expect(utilFilter.getFilterSettingValueByPropertyName({
      AssetTypes: [],
      Indexes: [],
      IsExempt: null,
      IsFavorite: true,
      Overdue: false,
      Search: '',
    }, '', 'IsFavorite')).toEqual({
      AssetTypes: [], Indexes: [], IsExempt: null, IsFavorite: null, Overdue: false, Search: '',
    });
  });

  it('Set string values IsExempt Item between all, false and true', () => {
    expect(utilFilter.getFilterSettingValueByPropertyName({
      AssetTypes: [],
      Indexes: [],
      IsExempt: true,
      IsFavorite: null,
      Overdue: false,
      Search: '',
    }, 'all', 'IsExempt')).toEqual({
      AssetTypes: [], Indexes: [], IsExempt: null, IsFavorite: null, Overdue: false, Search: '',
    });

    expect(utilFilter.getFilterSettingValueByPropertyName({
      AssetTypes: [],
      Indexes: [],
      IsExempt: false,
      IsFavorite: null,
      Overdue: false,
      Search: '',
    }, 'true', 'IsExempt')).toEqual({
      AssetTypes: [], Indexes: [], IsExempt: true, IsFavorite: null, Overdue: false, Search: '',
    });

    expect(utilFilter.getFilterSettingValueByPropertyName({
      AssetTypes: [],
      Indexes: [],
      IsExempt: null,
      IsFavorite: null,
      Overdue: false,
      Search: '',
    }, 'false', 'IsExempt')).toEqual({
      AssetTypes: [], Indexes: [], IsExempt: false, IsFavorite: null, Overdue: false, Search: '',
    });
  });
});
