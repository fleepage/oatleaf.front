import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = (props) => {
  const { auth } = useContext(AuthContext);
  const Component = props.component;
  const isAuthenticated = auth.isAuth;

  return !isAuthenticated ? (
    <Route {...props} render={<Component {...props} />} />
  ) : (
    <Redirect to={{ pathname: "/" }} />
  );
};

export default ProtectedRoute;
