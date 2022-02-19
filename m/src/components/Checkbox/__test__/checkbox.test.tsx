import React from 'react';
import { render } from '@testing-library/react';
// eslint-disable-next-line import/no-unresolved
import { Simulate } from 'react-dom/test-utils';
import Checkbox, { ICheckbox } from '..';

const propsCheckBoxComponent: ICheckbox = {
  label: 'Teste',
  onChange: jest.fn(),
  defaultChecked: false,
  id: 'Teste',
  value: '',
  name: 'teste',
  testid: 'test-id-checkbox',
};

const makeComponentStub = (
  _: any,
  props: ICheckbox = propsCheckBoxComponent,
) => (render(<Checkbox {...props} />));

describe('Checkbox Component', () => {
  describe('Render', () => {
    it('should render checkbox', () => {
      expect(makeComponentStub(null)).toBeDefined();
    });

    it('must invoke functions with click event', () => {
      const { getByTestId } = makeComponentStub(null);
      const checkBoxComponent = getByTestId(propsCheckBoxComponent.testid);

      expect(propsCheckBoxComponent.onChange).toBeCalledTimes(0);

      Simulate.change(checkBoxComponent, { target: { value: true } });

      expect(propsCheckBoxComponent.onChange).toBeCalledTimes(1);
    });
  });
});
