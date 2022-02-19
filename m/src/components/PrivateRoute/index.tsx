import React from 'react';
import { Route, RouteProps, useHistory } from 'react-router-dom';
import utilsAuth from '../../utils/route';

const PrivateRoute = ({ component: Component, ...rest }: RouteProps) => {
  const history = useHistory();
  if (!utilsAuth.isAuthenticate()) history.push('/logout');
  return (
    <Route
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      component={Component}
    />
  );
};

export default PrivateRoute;
