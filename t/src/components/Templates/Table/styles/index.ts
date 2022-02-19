import styled from 'styled-components'

export const Wrapper = styled.div`
  background: #10121a;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: 100%;

  .flex-column {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }

  table {
    border-collapse: collapse;
    white-space: nowrap;
    font-size: 0.75em;
    padding: 5px;
    width: 100%;
    color: #fff;
  }
`

type TRow = {
  background?: string
}

export const Row = styled.tr<TRow>`
  &.selected td {
    background: ${({ background }) => background || '#394360'};
  }

  :hover td {
    background: ${({ background }) => background || '#394360'};
  }

  :last-child {
    td {
      border-bottom: 0;
    }
  }

  :nth-child(1) th,
  :nth-child(2) th {
    border-bottom: solid 1px #10121a;
  }
`
export const TableContainer = styled.div`
  flex-direction: column;
  min-height: ${({ minHeight }: any) => minHeight || 'auto'};
  padding: 0rem 0.1rem;
  overflow: auto;
  display: flex;
  height: 100%;

  /* width */
  ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #10121a;
    border-radius: 10px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: rgb(184, 184, 184);
    border-radius: 10px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: rgba(184, 184, 184, 0.8);
  }

  .sticky {
    [data-sticky-td] {
      position: sticky;
    }
  }
`

export const Header = styled.th`
  border-left: 1px solid #10121a;
  border-top: none;
  position: relative;
  background: #161b27;
  &.has-no-child {
    background: #1f2433;
    border-bottom: none;
  }

  white-space: nowrap;
  font-weight: ${(props) => (props.colSpan && props.colSpan > 1 ? 700 : 300)};

  .flex-column {
    display: flex;
    flex-direction: column;
    padding: 5px 10px;

    align-items: ${({ align }) => align || 'center'};
  }

  &.border-top {
    border: none;
    border-top: ${({ borderColor }: any) =>
    `1px solid ${borderColor}`} !important;
  }
  &.border-bottom {
    border: none;
    border-bottom: ${({ borderColor }: any) =>
    `1px solid ${borderColor}`} !important;
  }
  &.border-right {
    border: none;
    border-right: ${({ borderColor }: any) =>
    `1px solid ${borderColor}`} !important;
  }
  &.border-left {
    border: none;
    border-left: ${({ borderColor }: any) =>
    `1px solid ${borderColor}`} !important;
  }
  &.border-side-by-side {
    border: none;
    border-left: ${({ borderColor }: any) =>
    `1px solid ${borderColor}`} !important;
    border-right: ${({ borderColor }: any) =>
    `1px solid ${borderColor}`} !important;
  }

  :last-child {
    border-right: 0;
  }

  .resizer {
    display: inline-block;
    width: 1px;
    height: 100%;
    position: absolute;
    right: 0;
    top: 0;
    transform: translateX(50%);
    z-index: 1;

    &.isResizing {
      background: rgb(255, 199, 10);
    }
  }

  .header-cell {
    svg {
      margin-left: 5px;
    }
  }
`

export const Cell = styled.td`
  background: #1f2433;
  white-space: nowrap;
  border-left: 1px solid #10121a;
  border-bottom: 1px solid #10121a;
  position: relative;
  font-weight: 300;

  &.border-bottom {
    border: 'none';
    border-bottom: ${({ borderColor }: any) =>
    `1px solid ${borderColor}`} !important;
  }
  &.border-right {
    border: 'none';
    border-right: ${({ borderColor }: any) =>
    `1px solid ${borderColor}`} !important;
  }
  &.border-left {
    border: 'none';
    border-left: ${({ borderColor }: any) =>
    `1px solid ${borderColor}`} !important;
  }
  &.border-side-by-side {
    border: 'none';
    border-left: ${({ borderColor }: any) =>
    `1px solid ${borderColor}`} !important;
    border-right: ${({ borderColor }: any) =>
    `1px solid ${borderColor}`} !important;
  }
  &.empty-cell {
    margin: 0px;
    padding: 0px;
  }

  .resizer {
    display: inline-block;
    width: 1px;
    height: 100%;
    position: absolute;
    right: 0;
    top: 0;
    transform: translateX(50%);
    z-index: 1;
  }
`

export const TBody = styled.tbody`
  position: relative;
  z-index: 0;
`

export const THead = styled.thead`
  z-index: 1;
  width: fit-content;
  top: 0;
  position: sticky;
`

export const RadiosWrapper = styled.thead`
  display: flex;
  width: 100%;
  background: #1f2433;
  border-bottom: 1px solid #10121a;
  height: 100%;
`
export const Loading = styled.div`
  justify-content: center;
  align-items: center;
  min-height: 10rem;
  display: flex;
  flex-grow: 1;
  width: 100%;
  span {
    color: #fff;
  }
`

export const Content = styled.div`
  margin: ${({ margin }: { margin: number }) =>
    margin || margin === 0 ? `${margin}px` : '2px'};
  line-height: 20px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
