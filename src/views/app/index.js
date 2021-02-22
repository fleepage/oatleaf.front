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

const Students = React.lazy(() =>
  import(/* webpackChunkName: "History" */ "./students")
);
const Staffs = React.lazy(() =>
  import(/* webpackChunkName: "History" */ "./staffs")
);
const Parents = React.lazy(() =>
  import(/* webpackChunkName: "History" */ "./parents")
);
const Assessment = React.lazy(() =>
  import(/* webpackChunkName: "History" */ "./assessment")
);
const StudentDetail = React.lazy(() =>
  import(/* webpackChunkName: "History" */ "./students/detail")
);
const Attendance = React.lazy(() =>
  import(/* webpackChunkName: "History" */ "./attendance")
);

const Admission = React.lazy(() =>
  import(/* webpackChunkName: "History" */ "./admission")
);

const CBT = React.lazy(() => import(/* webpackChunkName: "History" */ "./cbt"));

const ClassRoom = React.lazy(() =>
  import(/* webpackChunkName: "History" */ "./classroom")
);

const Activity = React.lazy(() =>
  import(/* webpackChunkName: "History" */ "./activity")
);

const Settings = React.lazy(() =>
  import(/* webpackChunkName: "History" */ "./settings")
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

                {/* <PermissionedRoute
                  permission={"history"}
                  permissionList={permissionList}
                  path={`${match.url}/history`}
                  component={(props) => <History {...props} />}
                /> */}

                <PermissionedRoute
                  permission={"student"}
                  permissionList={permissionList}
                  path={`${match.url}/students`}
                  component={(props) => <Students {...props} />}
                />

                <PermissionedRoute
                  permission={"student"}
                  permissionList={permissionList}
                  path={`${match.url}/student/detail`}
                  component={(props) => <StudentDetail {...props} />}
                />

                <PermissionedRoute
                  permission={"staff"}
                  permissionList={permissionList}
                  path={`${match.url}/staffs`}
                  component={(props) => <Staffs {...props} />}
                />

                <PermissionedRoute
                  permission={"parent"}
                  permissionList={permissionList}
                  path={`${match.url}/parents`}
                  component={(props) => <Parents {...props} />}
                />

                <PermissionedRoute
                  permission={"assessment"}
                  permissionList={permissionList}
                  path={`${match.url}/assessment`}
                  component={(props) => <Assessment {...props} />}
                />
                <PermissionedRoute
                  permission={"tools"}
                  permissionList={permissionList}
                  path={`${match.url}/attendance`}
                  component={Attendance}
                />

                <PermissionedRoute
                  permission={"tools"}
                  permissionList={permissionList}
                  path={`${match.url}/cbt`}
                  component={CBT}
                />
                <PermissionedRoute
                  permission={"tools"}
                  permissionList={permissionList}
                  path={`${match.url}/classroom`}
                  component={ClassRoom}
                />
                <PermissionedRoute
                  permission={"tools"}
                  permissionList={permissionList}
                  path={`${match.url}/activity`}
                  component={Activity}
                />

                <PermissionedRoute
                  permission={"tools"}
                  permissionList={permissionList}
                  path={`${match.url}/admission`}
                  component={Admission}
                />

                <PermissionedRoute
                  permission={"settings"}
                  permissionList={permissionList}
                  path={`${match.url}/settings`}
                  component={Settings}
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

                {/* <PermissionedRoute
                  permission={"support"}
                  permissionList={permissionList}
                  path={`${match.url}/support`}
                  component={(props) => <Help {...props} />}
                /> */}

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
