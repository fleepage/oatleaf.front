import React, { Suspense } from "react";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";

import AppLayout from "../../../layout/AppLayout";
import MenuContextProvider from "../../../context/MenuContext";
// import { ProtectedRoute, UserRole } from '../../helpers/authHelper';

const Faq = React.lazy(() => import(/* webpackChunkName: "Faq" */ "./faq"));
const ContactUs = React.lazy(() =>
  import(/* webpackChunkName: "ContactUs" */ "./contact")
);

const Help = ({ match }) => {
  return (
    <div className="dashboard-wrapper">
      <Suspense fallback={<div className="loading" />}>
        <Switch>
          <Redirect exact from={`${match.url}/`} to={`${match.url}/faq`} />
          <Route
            path={`${match.url}/faq`}
            render={(props) => <Faq {...props} />}
          />
          <Route
            path={`${match.url}/ticket`}
            render={(props) => <ContactUs {...props} />}
          />
          <Redirect to="/error" />
        </Switch>
      </Suspense>
    </div>
  );
};

export default withRouter(Help);
