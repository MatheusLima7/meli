import styled from 'styled-components';

type TTableRunContainer = {
  isOpenedBlotter?: boolean;
};

export const TableRunContainer = styled.div<TTableRunContainer>`
    background: #161B27;
    position: relative;
    flex-direction: column;
    margin: 0rem 1rem;
    margin-bottom: 0.8rem;
    display: flex;
    flex-grow: 1;
`;

export const TableContainer = styled.div`
  flex-direction: column;
  position: relative;
  display: flex;
  flex-grow: 1;
  height: 100px;
  overflow-y: scroll;

  td[role='cell']:not(:nth-child(2), :nth-child(3)) {
    text-align: center;
  }

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
`;

export const TableRun = styled.table`
  background-color: #262D3F;
`;

export const MessageContent = styled.div`
  background-color: #10121a;
  justify-content: center;
  align-items: center;
  display: flex;
  height: 100%;
  width: 100%;
  span {
    font-family: Roboto, sans-serif;
    font-size: 0.75rem;
    color: #FFF;
  }
`;
