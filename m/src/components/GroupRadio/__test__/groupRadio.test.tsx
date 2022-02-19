import React from 'react';
import { render } from '@testing-library/react';
import GroupRadio from '..';
import { TGroupRadio } from '../../../typing/filters';

const propsGroupRadio: TGroupRadio = {
  data: [
    {
      defaultChecked: false,
      id: 'teste',
      value: 'true',
      name: 'teste',
      label: 'teste',
    },
  ],
  onChange: jest.fn(),
};

const makeComponentStub = (_: any, props: TGroupRadio) => {
  const { data, onChange } = props;
  return render(<GroupRadio data={data} onChange={onChange} />);
};

describe('GroupRadio Component', () => {
  describe('Render', () => {
    it('should render GroupRadio', () => {
      expect(makeComponentStub(null, propsGroupRadio)).toBeDefined();
    });
  });
});
