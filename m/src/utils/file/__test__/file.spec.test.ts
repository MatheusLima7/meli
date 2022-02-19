// eslint-disable-next-line max-classes-per-file
import { createFileName } from '..';
import { formatDateDictionary } from '../../date';

jest.mock('../../date', () => ({
  formatDateDictionary: {
    MMMM: jest.fn(),
    DD: jest.fn(),
  },
}));

global.Date = class {
  getFullYear = jest.fn(() => 2020);
};

describe('Create file name', () => {
  it('should create name as specified', () => {
    formatDateDictionary.MMMM.mockReturnValue('dezembro');
    formatDateDictionary.DD.mockReturnValue('01');
    expect(createFileName('NomeEspecífico')).toEqual('NomeEspecífico-01-Dez-2020');
  });
  it('should create name as specified, year future', () => {
    global.Date = class {
      getFullYear = jest.fn(() => 2100);
    };
    formatDateDictionary.MMMM.mockReturnValue('dezembro');
    formatDateDictionary.DD.mockReturnValue('01');
    expect(createFileName('NomeEspecífico')).toEqual('NomeEspecífico-01-Dez-2100');
  });
});
