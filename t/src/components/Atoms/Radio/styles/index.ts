import styled from 'styled-components';

export default styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  position: relative;
  height: 24px;
  font-size: 0.75em;

  [type='radio']:checked,
  [type='radio']:not(:checked) {
    position: absolute;
    opacity: 0;
  }

  [type='radio']:checked + label,
  [type='radio']:not(:checked) + label {
    position: relative;
    cursor: pointer;
    color: #fff;
  }

  [type='radio']:checked + label:before,
  [type='radio']:not(:checked) + label:before {
    content: '';
    position: absolute;
    width: 10px;
    height: 10px;
    left: -20px;
    border: 2px solid #ffc70a;
    border-radius: 100%;
    background: transparent;
  }

  [type='radio']:checked + label:after,
  [type='radio']:not(:checked) + label:after {
    content: '';
    width: 8px;
    height: 8px;
    background: #ffc70a;
    position: absolute;
    top: 3px;
    left: -17px;
    border-radius: 100%;
    -webkit-transition: all 0.2s ease;
    transition: all 0.2s ease;
  }

  [type='radio']:not(:checked) + label:after {
    opacity: 0;
    -webkit-transform: scale(0);
    transform: scale(0);
  }

  [type='radio']:checked + label:after {
    opacity: 1;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
`;
