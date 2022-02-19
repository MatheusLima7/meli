import React from 'react';
import { render } from '@testing-library/react';
import GroupCheckbox from '..';
import { TGroupCheckbox } from '../../../typing/filters';

const propsGroupCheckbox: TGroupCheckbox = {
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

const makeComponentStub = (initialState: any, props: TGroupCheckbox) => {
  const { data, onChange } = props;
  return render(<GroupCheckbox data={data} onChange={onChange} />);
};

describe('GroupCheckbox Component', () => {
  describe('Render', () => {
    it('should render GroupCheckbox', () => {
      expect(makeComponentStub(null, propsGroupCheckbox)).toBeDefined();
    });
  });
});
