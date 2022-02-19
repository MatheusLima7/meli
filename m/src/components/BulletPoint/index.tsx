import React from 'react';
import { Wrapper, Ball } from './styles';

type TBulletPoint = {
  label: string;
  color: string;
  testid: string;
};

const BulletPoint = ({ label = '', color = '#298833', testid }: TBulletPoint) => (
  <Wrapper data-testid={testid}>
    <Ball color={color} />
    {label}
  </Wrapper>
);

export default BulletPoint;
