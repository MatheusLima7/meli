/* istanbul ignore file */

import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html,
  body {
    width: 100%;
    height: 100%;
    font-family: "Roboto";
    margin: 0;
    padding: 0;
    background-color: #10121A;
  }

  .socket-loading {
    position: absolute;
    right: 15px;
    top: 15px;
  }
`;
