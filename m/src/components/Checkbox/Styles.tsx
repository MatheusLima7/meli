/* istanbul ignore file */

import styled from 'styled-components';

export default styled.div`
  display: flex;
  height: 24px;
  font-size: 0.75em;
  align-items: center;

  [type='checkbox']:checked,
  [type='checkbox']:not(:checked) {
    opacity: 0;
  }

  [type='checkbox']:checked + label,
  [type='checkbox']:not(:checked) + label {
    position: relative;
    cursor: pointer;
    color: #c8cacd;
  }

  [type='checkbox']:checked + label:before,
  [type='checkbox']:not(:checked) + label:before {
    content: '';
    position: absolute;
    width: 10px;
    height: 10px;
    left: -20px;
    border: 2px solid #c8cacd;
    background: transparent;
  }

  [type='checkbox']:checked + label:after,
  [type='checkbox']:not(:checked) + label:after {
    content: '';
    width: 8px;
    height: 8px;
    background: #c8cacd;
    position: absolute;
    top: 3px;
    left: -17px;
    transition: all 0.2s ease;
  }

  [type='checkbox']:not(:checked) + label:after {
    opacity: 0;
    transform: scale(0);
  }

  [type='checkbox']:checked + label:after {
    opacity: 1;
    transform: scale(1);
  }
`;
