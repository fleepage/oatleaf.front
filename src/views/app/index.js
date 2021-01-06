import React, { Suspense, useContext, useEffect, useState } from "react";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import { LogoutAction } from "../../actions/AuthAction";
import { AccountContext } from "../../context/AccountContext";
import { AuthContext } from "../../context/AuthContext";
import MenuContextProvider from "../../context/MenuContext";
import AppLayout from "../../layout/AppLayout";
import PermissionedRoute from "../../route/PermissionedRoute";

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
  const accountContext = useContext(AccountContext);
  const [permissionList, setPermissionList] = useState(
    accountContext?.account?.permissions?.map((x) => x.permission)
  );
  const [role, setRole] = useState("User");

  useEffect(() => {
    try {
      setRole(
        accountContext?.account?.data[accountContext?.account?.account ?? 0]
          ?.role
      );
    } catch (e) {
      props.history.push("/accounts");
    }
  }, [role, permissionList]);

  //const role = "Admin";
  //const permission = accountContext?.account?.permissions;
  //console.log(accountContext?.account?.permissions?.map((x) => x.permission));
  //const permissionList = []; //permission.map((item, i) => item.name);

  const handleLogout = () => {
    dispatch(LogoutAction({ message: "" }));
  };

  return (
    <>
      <MenuContextProvider>
        <AppLayout handleLogout={handleLogout} permission={permissionList}>
          <div className="dashboard-wrapper">
            <Suspense fallback={<div className="loading" />}>
              <Switch>
                <Redirect exact from={`${match.url}/`} to={`/accounts`} />

                <Route
                  path={`${match.url}/home`}
                  render={(props) => <DashBoard {...props} view={role} />}
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
    </>
  );
};

export default withRouter(App);
