import React, { render } from '@testing-library/react';
import ConfirmationModal, { TConfirmationModal } from '..';

describe('ConfirmationModal', () => {
  const defaultProps: TConfirmationModal = {
    onConfirm: jest.fn(),
    onCancel: jest.fn(),
    descrition: 'descrition',
    title: 'title',
    isOpen: true,
  };

  const renderComponent = (newProps = {}) => (
    render(<ConfirmationModal {...defaultProps} {...newProps} />)
  );

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Component must render correctly', () => {
    const { getByTestId } = renderComponent();
    const element = getByTestId('confirmation-modal-wrapper');
    expect(element).toBeTruthy();
  });
});
