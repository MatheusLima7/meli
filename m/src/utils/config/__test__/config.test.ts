import utilConfig from '..';
import { TConfigByProfile } from '../../../mocks/config-by-profile';

const config: TConfigByProfile = {
  name: 'teste',
  id: 2,
  isMounted: false,
};

describe('Utility of Config', () => {
  describe('Set mounted component', () => {
    it('should to be returned new objet with attribute changed', () => {
      expect(utilConfig.setMountedComponent([config], 'teste')).toEqual([{ ...config, isMounted: true }]);
    });
  });
});
