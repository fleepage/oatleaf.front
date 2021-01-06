import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = (props) => {
  const { auth } = useContext(AuthContext);
  const Component = props.component;
  const isAuthenticated = auth?.isAuth ?? false;
  const message = auth?.message ?? "/login";
  const path = `/login`; //${message !== "" ? `?m=${btoa(message)}` : ""}

  return isAuthenticated ? (
    <Route {...props} render={<Component {...props} />} />
  ) : (
    <Redirect to={{ pathname: path }} />
  );
};

export default ProtectedRoute;
