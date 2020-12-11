/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable react/no-array-index-key */
import React from "react";
import { NavItem, Badge, Nav } from "reactstrap";
import { NavLink } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import classnames from "classnames";
import { Separator } from "../../component/common/CustomBootstrap";
import IntlMessages from "../../helpers/IntlMessages";
import ApplicationMenu from "./ApplicationMenu";

const RightSideMenu = ({
  todoItems,
  filter,
  allTodoItems,
  loading,
  labels,
  categories,
  getTodoListWithFilterAction,
}) => {
  const addFilter = (column, value) => {
    getTodoListWithFilterAction(column, value);
  };

  return (
    <ApplicationMenu>
      <PerfectScrollbar
        options={{ suppressScrollX: true, wheelPropagation: false }}
      >
        <div className="p-4">
          <p className="text-muted text-small">
            <h2>What you should know?</h2>
          </p>
          <ul className="list-styled mb-5">
            <NavItem>
              By using ercasConnect you have agreed to our terms and conditions.
            </NavItem>
            <br />
            <NavItem>We do not store your card deatails.</NavItem>
            <br />
            <NavItem>
              Nobody from Ercas Integrated Solutions will ask for your card
              details. So plaase do not share your card details with anybody.
            </NavItem>
            <br />
            <NavItem>
              When faced with any issue reach out to our team through our{" "}
              <NavLink to="/">Support System</NavLink>.
            </NavItem>
          </ul>
        </div>
      </PerfectScrollbar>
    </ApplicationMenu>
  );
};

export default RightSideMenu;
