import React, { Suspense } from "react";
import { IntlProvider } from "react-intl";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//import ColorSwitcher from './components/common/ColorSwitcher';
//import { NotificationContainer } from './components/common/react-notifications';
import { adminRoot } from "./constants/defaultValues";
import AuthContextProvider from "./context/AuthContext";
import BillContextProvider from "./context/BillContext";
import { getDirection } from "./helpers/Utils";
import AppLocale from "./lang";
import ProtectedRoute from "./route/ProtectedRoute";

const Register = React.lazy(() =>
  import(/* webpackChunkName: "views" */ "./views/register")
);

const Login = React.lazy(() =>
  import(/* webpackChunkName: "views" */ "./views/login")
);

const ViewSwitcher = React.lazy(() =>
  import(/* webpackChunkName: "views" */ "./views/switcher")
);

const ViewHome = React.lazy(() =>
  import(/* webpackChunkName: "views" */ "./views/home")
);
const ViewApp = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ "./views/app")
);
const RequestApp = React.lazy(() =>
  import(/* webpackChunkName: "views-user" */ "./views/request")
);

const Completed = React.lazy(() =>
  import(/* webpackChunkName: "views-error" */ "./views/anonymous/completed")
);

const FourOfour = React.lazy(() =>
  import(/* webpackChunkName: "views-error" */ "./views/switcher/404")
);

// const ViewUnauthorized = React.lazy(() =>
//   import(/* webpackChunkName: "views-error" */ './views/unauthorized')
//);

class App extends React.Component {
  constructor(props) {
    super(props);
    const direction = getDirection();
    if (direction.isRtl) {
      document.body.classList.add("rtl");
      document.body.classList.remove("ltr");
    } else {
      document.body.classList.add("ltr");
      document.body.classList.remove("rtl");
    }
  }

  render() {
    const { locale } = this.props;
    const currentAppLocale = AppLocale["en"];

    return (
      <AuthContextProvider>
        <BillContextProvider>
          <div className="h-100">
            <IntlProvider
              locale={currentAppLocale.locale}
              messages={currentAppLocale.messages}
            >
              <>
                <Suspense fallback={<div className="loading" />}>
                  <Router>
                    <Switch>
                      <ProtectedRoute path={adminRoot} component={ViewApp} />

                      <ProtectedRoute
                        path="/accounts"
                        component={ViewSwitcher}
                      />

                      <Route
                        path="/"
                        exact
                        render={(props) => <ViewHome {...props} />}
                      />

                      <Route
                        path="/login"
                        render={(props) => <Login {...props} />}
                      />
                      <Route
                        path="/register"
                        render={(props) => <Register {...props} />}
                      />
                      <Route
                        path="/request"
                        component={RequestApp}
                        //render={(props) => <RequestApp {...props} />}
                      />
                      <Route
                        exact
                        path="/completed"
                        render={(props) => <Completed {...props} />}
                      />
                      {/*
                  <Redirect exact from="/" to={adminRoot} />
                  */}

                      <Route
                        exact
                        path="/error"
                        render={(props) => <div>Error</div>}
                      />
                    </Switch>
                  </Router>
                </Suspense>
              </>
            </IntlProvider>
          </div>
        </BillContextProvider>
      </AuthContextProvider>
    );
  }
}

export default App;
