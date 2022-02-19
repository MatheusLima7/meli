import { TConfigByProfile } from '../../mocks/config-by-profile';

const setMountedComponent = (config: TConfigByProfile[], name: string) => config.map((item) => {
  if (item.name === name) {
    return { ...item, isMounted: true };
  }
  return item;
});

export default {
  setMountedComponent,
};
