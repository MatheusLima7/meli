import React, { useEffect } from 'react';
import utilGoogleAnalitycs from '../../utils/ga';

const Error: React.FC = () => {
  useEffect(() => {
    utilGoogleAnalitycs.setGA('page', 'error', null);
  }, []);

  return (
    <h1 data-testid="error-message">não encontrada</h1>
  );
};

export default Error;
