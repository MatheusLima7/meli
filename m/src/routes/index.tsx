import React, { memo } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import Run from '../pages/Home';
import Authenticate from '../pages/Authenticate';
import Logout from '../pages/Logout';
import Login from '../pages/Login';
import PrivatedRoute from '../components/PrivateRoute';
import BoxMessage from '../components/BoxMessage';
import SocketProvider from '../hooks/useSocket/provider';
import GlobalNotificationProvider from '../hooks/useGlobalNotification';
import AuthProvider from '../hooks/useAuthenticate';
import TableProvider from '../hooks/useTable';
import ServicesProvider from '../services';

const RouteConfig = () => (
  <Router basename={process.env.BASENAME}>
    <GlobalNotificationProvider>
      <ServicesProvider>
        <AuthProvider>
          <>
            <SocketProvider>
              <TableProvider>
                <Switch>
                  <PrivatedRoute
                    component={Run}
                    path="/"
                    exact
                  />
                  <Route
                    path="/authenticate"
                    component={Authenticate}
                  />
                  <Route
                    path="/login"
                    component={Login}
                  />
                  <Route path="/logout" component={Logout} />
                  <Route path="*" render={() => <h1>Erro</h1>} />
                </Switch>
              </TableProvider>
            </SocketProvider>
            <BoxMessage />
          </>
        </AuthProvider>
      </ServicesProvider>
    </GlobalNotificationProvider>
  </Router>
);

export default memo(RouteConfig);
