import React, { render } from '@testing-library/react';
// eslint-disable-next-line import/no-unresolved
import { Simulate } from 'react-dom/test-utils';
import Onboarding, { TOnboarding } from '..';

const mockAuthenticateValue: TOnboarding = {
  isOpen: true,
  closeModal: jest.fn(),
};

describe('Onboarding', () => {
  const renderComponent = (props = mockAuthenticateValue) => (
    render(
      <Onboarding {...props} />,
    )
  );

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Component must render correctly', () => {
    const { getByTestId } = renderComponent();
    const element = getByTestId('onboarding-modal-wrapper');
    expect(element).toBeTruthy();
  });

  it('Invoke a function when closing the modal', () => {
    const { getByTestId } = renderComponent();
    const element = getByTestId('close-button');

    expect(mockAuthenticateValue.closeModal).toHaveBeenCalledTimes(0);
    Simulate.click(element);
    expect(mockAuthenticateValue.closeModal).toHaveBeenCalledTimes(1);
  });

  it('Button next component must render correctly', () => {
    const { getByTestId, getAllByTestId } = renderComponent();
    const nextButton = getByTestId('next-button');
    const stepComponent = getAllByTestId('step-component');
    expect(stepComponent).toHaveLength(6);
    expect(stepComponent[0].getAttribute('class')).toContain('step-active');
    expect(stepComponent[1].getAttribute('class')).not.toContain('step-active');

    Simulate.click(nextButton);
    expect(stepComponent[0].getAttribute('class')).not.toContain('step-active');
    expect(stepComponent[1].getAttribute('class')).toContain('step-active');

    Simulate.click(nextButton);
    Simulate.click(nextButton);
    Simulate.click(nextButton);
    Simulate.click(nextButton);
    expect(stepComponent[4].getAttribute('class')).not.toContain('step-active');
    expect(stepComponent[5].getAttribute('class')).toContain('step-active');

    Simulate.click(nextButton);
    expect(stepComponent[0].getAttribute('class')).toContain('step-active');
    expect(stepComponent[5].getAttribute('class')).not.toContain('step-active');
  });
  it('Step select must render correctly', () => {
    const { getAllByTestId } = renderComponent();
    const stepComponent = getAllByTestId('step-component');
    expect(stepComponent).toHaveLength(6);
    expect(stepComponent[0].getAttribute('class')).toContain('step-active');
    expect(stepComponent[3].getAttribute('class')).not.toContain('step-active');

    Simulate.click(stepComponent[3]);
    expect(stepComponent[0].getAttribute('class')).not.toContain('step-active');
    expect(stepComponent[3].getAttribute('class')).toContain('step-active');
  });
});
