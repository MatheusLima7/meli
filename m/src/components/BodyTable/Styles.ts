import styled from 'styled-components';

type TWrapper = {
  hideItems: string[];
  isSendOffer: boolean;
}

export const Wrapper = styled.tbody<TWrapper>`
  ${({ hideItems }) => hideItems.map((item: any) => `
  .${item}{
    display: none;
  }`)}
  
  .bid.${({ isSendOffer }) => (isSendOffer ? 'action' : 'volume')} {
    border-left: 1px solid #36B243;
  }
  .bid.fee {
    border-right: 1px solid #36B243;
  }
  .offer.${({ isSendOffer }) => (isSendOffer ? 'action' : 'volume')} {
    border-right: 1px solid #3DA0E6;
  }
  .offer.fee {
    border-left: 1px solid #3DA0E6;
  }
  .row:last-child {
    .bid { border-bottom: 1px solid #36B243; }
    .offer { border-bottom: 1px solid #3DA0E6; }
  }
  display: table-row-group;
`;

export const Row = styled.tr``;

type TCell = {
  padding?: string;
}

export const Cell = styled.td<TCell>`
  background: rgb(31, 36, 51);
  white-space: nowrap;
  position: relative;
  border-left: 1px solid rgb(16, 18, 26);
  border-bottom: 1px solid rgb(16, 18, 26);
  font-family: Roboto;
  font-size: 0.75em;
  font-weight: 300;
  padding: ${({ padding }) => padding || 3}px;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: rgb(255, 255, 255);
  text-align: ${({ align }) => (align || 'center')};
  border-collapse: inherit;
  border-spacing: 0;
  vertical-align: inherit;
`;
