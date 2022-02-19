/* istanbul ignore file */

import React from 'react';
import ReactDOM from 'react-dom';
import ApplicationContainer from '@arsenal/core';
import App from './core/App';

// Mock app container.
ApplicationContainer.init({});

ReactDOM.render(<App />, document.getElementById('root'));
