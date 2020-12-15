import React, { Suspense, useEffect, useContext } from "react";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";
import AppLayout from "../../layout/AppLayout";
import MenuContextProvider from "../../context/MenuContext";
import { LogoutAction } from "../../actions/AuthAction";
import { AuthContext } from "../../context/AuthContext";
import PermissionedRoute from "../../route/PermissionedRoute";
import { UserRole } from "../../constants/authHelper";
import menuItems from "../../constants/menu";

// import { ProtectedRoute, UserRole } from '../../helpers/authHelper';

const DashBoard = React.lazy(() =>
  import(/* webpackChunkName: "Bills" */ "./dashboards")
);
const StateBills = React.lazy(() =>
  import(/* webpackChunkName: "StateBills" */ "./dashboards/stateBill")
);
const UtilityBills = React.lazy(() =>
  import(/* webpackChunkName: "UtilityBills" */ "./dashboards/utilityBill")
);
const History = React.lazy(() =>
  import(/* webpackChunkName: "History" */ "./dashboards/history")
);

const Help = React.lazy(() => import(/* webpackChunkName: "Help" */ "./help"));

const Receipt = React.lazy(() =>
  import(/* webpackChunkName: "Help" */ "./dashboards/receipt")
);

const App = ({ match, ...props }) => {
  const { dispatch, auth } = useContext(AuthContext);

  const role = "Admin";
  // console.log(
  //   menuItems.map((item) => {
  //     var option = {};
  //     if (item.permission) {
  //       option.name = item.permission;
  //       option.level = "rw";
  //     }
  //     return option;
  //   })
  // );
  const permission = UserRole[role]
    ? UserRole[role]
    : [
        { name: "history", level: "rw" },
        { name: "store", level: "rw" },
        { name: "support", level: "rw" },
      ];
  const permissionList = permission.map((item) => item.name);

  const handleLogout = () => {
    dispatch(LogoutAction());
  };

  return (
    <MenuContextProvider>
      <AppLayout handleLogout={handleLogout} permission={permissionList}>
        <div className="dashboard-wrapper">
          <Suspense fallback={<div className="loading" />}>
            <Switch>
              <Redirect exact from={`${match.url}/`} to={`/accounts`} />

              <Route
                path={`${match.url}/home`}
                render={(props) => <DashBoard {...props} view={"admin"} />}
              />

              <PermissionedRoute
                permission={"history"}
                permissionList={permissionList}
                path={`${match.url}/history`}
                component={(props) => <History {...props} />}
              />

              <Route
                path={`${match.url}/state-bill`}
                render={(props) => <StateBills {...props} />}
              />
              <Route
                path={`${match.url}/utility-bill`}
                render={(props) => <UtilityBills {...props} />}
              />
              {/* <Route
                path={`${match.url}/history`}
                render={(props) =>
                  props.location.search.length === 0 ? (
                    <History {...props} />
                  ) : (
                    <Receipt {...props} />
                  )
                }
              /> */}

              {/* <Route
                path={`${match.url}/support`}
                render={(props) => <Help {...props} />}
              /> */}

              <PermissionedRoute
                permission={"support"}
                permissionList={permissionList}
                path={`${match.url}/support`}
                component={(props) => <Help {...props} />}
              />

              <Redirect to="/error" />
            </Switch>
          </Suspense>
        </div>
      </AppLayout>
    </MenuContextProvider>
  );
};

export default withRouter(App);
