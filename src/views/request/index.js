import React, { Suspense, useEffect, useContext } from "react";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";
import UserLayout from "../../layout/UserLayout";
import MenuContextProvider from "../../context/MenuContext";
import { LogoutAction } from "../../actions/AuthAction";
import { AuthContext } from "../../context/AuthContext";

// import { ProtectedRoute, UserRole } from '../../helpers/authHelper';

const StepOne = React.lazy(() =>
  import(/* webpackChunkName: "Bills" */ "./stepOne")
);

const Riders = React.lazy(() =>
  import(/* webpackChunkName: "Bills" */ "./riders")
);

const Source = React.lazy(() =>
  import(/* webpackChunkName: "Bills" */ "./source")
);

const Destination = React.lazy(() =>
  import(/* webpackChunkName: "Bills" */ "./destination")
);

const Preview = React.lazy(() =>
  import(/* webpackChunkName: "Bills" */ "./preview")
);

const Payment = React.lazy(() =>
  import(/* webpackChunkName: "Bills" */ "./payment")
);

const Confirm = React.lazy(() =>
  import(/* webpackChunkName: "Bills" */ "./confirm")
);

const Automobile = React.lazy(() =>
  import(/* webpackChunkName: "Bills" */ "./automobile")
);

const Request = ({ match, ...props }) => {
  return (
    <UserLayout>
      <Suspense fallback={<div className="loading" />}>
        <Switch>
          <Redirect exact from={`${match.url}/`} to={`${match.url}/route`} />

          <Route
            path={`${match.url}/route`}
            render={(props) => <StepOne {...props} />}
          />

          <Route
            path={`${match.url}/riders`}
            render={(props) => <Riders {...props} />}
          />

          <Route
            path={`${match.url}/auto`}
            render={(props) => <Automobile {...props} />}
          />

          <Route
            path={`${match.url}/source`}
            render={(props) => <Source {...props} />}
          />

          <Route
            path={`${match.url}/destination`}
            render={(props) => <Destination {...props} />}
          />

          <Route
            path={`${match.url}/preview`}
            render={(props) => <Preview {...props} />}
          />

          <Route
            path={`${match.url}/payment`}
            render={(props) => <Payment {...props} />}
          />

          <Route
            path={`${match.url}/confirm`}
            render={(props) => <Confirm {...props} />}
          />

          <Redirect to="/error" />
        </Switch>
      </Suspense>
    </UserLayout>
  );
};

export default withRouter(Request);
