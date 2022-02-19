import React, { useState, useEffect, ReactElement } from 'react';
import Wrapper from './Styles';
import { TItemTable } from '../../typing/table';

export type TButton = {
  isEnabled: boolean;
  id: string;
  children: ReactElement | string;
  testid: string;
  item?: TItemTable;
  onClick?: () => void;
};

const Button = ({
  isEnabled,
  children = '',
  testid,
  onClick,
}: TButton) => {
  const [disabled, setDisabled] = useState(false);
  useEffect(() => {
    setDisabled(!isEnabled);
  }, [isEnabled]);

  return (
    <Wrapper
      data-testid={testid}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </Wrapper>
  );
};

export default Button;
