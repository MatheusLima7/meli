/* istanbul ignore file */

import styled from 'styled-components';

export const Wrapper = styled.div`
  justify-content: flex-end;
  align-items: center;
  position: relative;
  display: flex;
  height: 24px;
  width: 13rem;

  ul {
    li {
      div {
        position: relative;
        input[type='checkbox']:checked,
        input[type='checkbox']:not(:checked) {
          position: relative;
          margin: 7px;
        }
      }
    }
  }
`;

export const EditColumnsContainer = styled.div`
    margin: 0rem 0.5rem;
`;
