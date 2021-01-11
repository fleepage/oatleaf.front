/* eslint-disable react/no-array-index-key */
import React from "react";
import { NavLink } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import { adminRoot } from "../../constants/defaultValues";
import IntlMessages from "../../helpers/IntlMessages";

const getMenuTitle = (sub) => {
  if ("/" + sub === adminRoot) return <IntlMessages id="menu.home" />;
  return <IntlMessages id={`${sub}`} />;
};

const getUrl = (path, sub, index) => {
  return path.split(sub)[0] + sub;
};

const BreadcrumbContainer = ({ heading, match }) => {
  return (
    <>
      {heading && (
        <h1 className="text-muted">
          <IntlMessages id={heading} />
        </h1>
      )}
      <BreadcrumbItems match={match} />
    </>
  );
};

const BreadcrumbItems = ({ match }) => {
  const path = match.path.substr(1);
  let paths = path.split("/");
  if (paths[paths.length - 1].indexOf(":") > -1) {
    paths = paths.filter((x) => x.indexOf(":") === -1);
  }
  return (
    <>
      <Breadcrumb className="pt-0 breadcrumb-container d-none d-sm-block d-lg-inline-block">
        {paths.map((sub, index) => {
          return (
            <BreadcrumbItem key={index} active={paths.length === index + 1}>
              {paths.length !== index + 1 ? (
                <NavLink
                  to={`/${getUrl(path, sub, index)}`}
                  style={{ color: "#3db264" }}
                >
                  {getMenuTitle(sub)}
                </NavLink>
              ) : (
                ""
              )}
            </BreadcrumbItem>
          );
        })}
      </Breadcrumb>
    </>
  );
};

export default BreadcrumbContainer;
