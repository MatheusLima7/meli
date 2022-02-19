import React, { render } from '@testing-library/react';
import Steps from '../steps';

jest.mock('../../../utils/storage');

describe('Onboarding', () => {
  const renderComponent = (Component: any) => (
    render(<Component />)
  );

  const checkParameters = (step: any) => {
    expect(step.img.src).toBeDefined();
    expect(step.img.alt).toBeDefined();
    expect(step.title).toBeDefined();
  };

  it('Contents 0 must render correctly', () => {
    const { getByTestId } = renderComponent(Steps[0].contents);
    const element = getByTestId('test-contents-component');
    expect(element).toBeTruthy();
  });
  it('Contents 1 must render correctly', () => {
    const { getByTestId } = renderComponent(Steps[1].contents);
    const element = getByTestId('test-contents-component');
    expect(element).toBeTruthy();
  });
  it('Contents 2 must render correctly', () => {
    const { getByTestId } = renderComponent(Steps[2].contents);
    const element = getByTestId('test-contents-component');
    expect(element).toBeTruthy();
  });
  it('Contents 3 must render correctly', () => {
    const { getByTestId } = renderComponent(Steps[3].contents);
    const element = getByTestId('test-contents-component');
    expect(element).toBeTruthy();
  });
  it('Contents 4 must render correctly', () => {
    const { getByTestId } = renderComponent(Steps[4].contents);
    const element = getByTestId('test-contents-component');
    expect(element).toBeTruthy();
  });
  it('Contents 5 must render correctly', () => {
    const { getByTestId } = renderComponent(Steps[5].contents);
    const element = getByTestId('test-contents-component');
    expect(element).toBeTruthy();
  });
  it('each step must have its parameters defined', () => {
    Steps.forEach((step) => checkParameters(step));
  });
});
