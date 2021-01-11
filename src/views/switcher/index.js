import React, { Suspense, useContext } from "react";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import { LogoutAction } from "../../actions/AuthAction";
import { AccountContext } from "../../context/AccountContext";
import { AuthContext } from "../../context/AuthContext";
import MenuContextProvider from "../../context/MenuContext";
import SwitchLayout from "../../layout/SwitchLayout";
// import { ProtectedRoute, UserRole } from '../../helpers/authHelper';

const Account = React.lazy(() =>
  import(/* webpackChunkName: "Bills" */ "./accounts")
);

const FourOfour = React.lazy(() =>
  import(/* webpackChunkName: "Bills" */ "./404")
);
const SchoolSetup = React.lazy(() =>
  import(/* webpackChunkName: "Bills" */ "./../anonymous/schoolSetup")
);
const OrganisationSetup = React.lazy(() =>
  import(/* webpackChunkName: "Bills" */ "./../anonymous/organisationSetup")
);
const FreelanceSetup = React.lazy(() =>
  import(/* webpackChunkName: "Bills" */ "./../anonymous/freelanceSetup")
);
const ParentSetup = React.lazy(() =>
  import(/* webpackChunkName: "Bills" */ "./../anonymous/parentSetup")
);

const Switcher = ({ match, ...props }) => {
  const authContext = useContext(AuthContext);
  const accountContext = useContext(AccountContext);

  // useEffect(async () => {
  //   var _accounts = await MyAccountsService({
  //     token: authContext.auth.data.token,
  //   });
  //   if (_accounts != undefined) {
  //     accountContext.dispatch(AddAccount({ data: _accounts.data }));
  //   } else {
  //     accountContext.dispatch(AddAccount({ data: {} }));
  //   }
  // }, []);

  const handleLogout = () => {
    authContext.dispatch(LogoutAction({ message: "" }));
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
                path={`${match.url}/school/register`}
                render={(props) => <SchoolSetup {...props} />}
              />
              <Route
                path={`${match.url}/organisation/register`}
                render={(props) => <OrganisationSetup {...props} />}
              />
              <Route
                path={`${match.url}/freelance/register`}
                render={(props) => <FreelanceSetup {...props} />}
              />
              <Route
                path={`${match.url}/parent/setup`}
                render={(props) => <ParentSetup {...props} />}
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
