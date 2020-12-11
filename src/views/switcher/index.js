import React, { Suspense, useEffect, useContext } from "react";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";
import AppLayout from "../../layout/AppLayout";
import MenuContextProvider from "../../context/MenuContext";
import { LogoutAction } from "../../actions/AuthAction";
import { AuthContext } from "../../context/AuthContext";
import PermissionedRoute from "../../route/PermissionedRoute";
import { UserRole } from "../../constants/authHelper";
import menuItems from "../../constants/menu";
import SwitchLayout from "../../layout/SwitchLayout";

// import { ProtectedRoute, UserRole } from '../../helpers/authHelper';

const Account = React.lazy(() =>
  import(/* webpackChunkName: "Bills" */ "./accounts")
);

const FourOfour = React.lazy(() =>
  import(/* webpackChunkName: "Bills" */ "./404")
);

const Switcher = ({ match, ...props }) => {
  const { dispatch, auth } = useContext(AuthContext);

  const handleLogout = () => {
    dispatch(LogoutAction());
  };

  return (
    <MenuContextProvider>
      <SwitchLayout handleLogout={handleLogout} {...props}>
        <div className="dashboard-wrapper">
          <Suspense fallback={<div className="loading" />}>
            <Switch>
              <Redirect exact from={`${match.url}/`} to={`accounts/home`} />

              <Route
                path={`${match.url}/home`}
                render={(props) => <Account {...props} />}
              />

              <Route
                path={`${match.url}/404`}
                render={(props) => <FourOfour {...props} />}
              />

              <Redirect to="/error" />
            </Switch>
          </Suspense>
        </div>
      </SwitchLayout>
    </MenuContextProvider>
  );
};

export default withRouter(Switcher);
