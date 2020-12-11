import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

const PermissionedRoute = ({
  permission = "",
  permissionList = [],
  ...props
}) => {
  const Component = props.component;

  return permissionList === undefined || permission === undefined ? (
    <Redirect to={{ pathname: "/accounts/404" }} />
  ) : permissionList.length > 0 ? (
    permissionList.some((permit) => permit === permission) ? (
      <Route {...props} render={<Component {...props} />} />
    ) : (
      <Redirect to={{ pathname: "/accounts/404" }} />
    )
  ) : (
    <Redirect to={{ pathname: "/accounts/404" }} />
  );
};

export default PermissionedRoute;
