import React from 'react';
import { render } from '@testing-library/react';
import Volume, { TVolume } from '..';

const VolumeProps: TVolume = { value: 10 };

const makeComponentStub = (initialState: any, props: TVolume) => {
  const { value } = props;
  return render(<Volume value={value} />);
};

describe('Volume Component', () => {
  describe('Render', () => {
    it('should render Volume', () => {
      expect(makeComponentStub(null, VolumeProps)).toBeDefined();
    });
  });
});
