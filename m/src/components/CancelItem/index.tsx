import React from 'react';
import styled from 'styled-components';
import Cancel from '../../assets/cancel.png';

const Image = styled.img`
  cursor: pointer;
`;

type TCancelItem = {
  onClick: any;
}

const CancelItem = ({
  onClick,
}: TCancelItem) => <Image onClick={onClick} src={Cancel} />;

export default CancelItem;
