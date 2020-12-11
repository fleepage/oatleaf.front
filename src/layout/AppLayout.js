import React, { useContext } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { MenuContext } from "../context/MenuContext";
import TopNav from "../component/navs/Topnav";
import Sidebar from "../component/navs/Sidebar";
import Footer from "../component/navs/Footer";
import { AuthContext } from "../context/AuthContext";
import {
  setContainerClassnames,
  addContainerClassname,
  changeDefaultClassnames,
  changeSelectedMenuHasSubItems,
} from "../actions/MenuActions";

const AppLayout = ({
  containerClassnames,
  children,
  history,
  handleLogout,
  permission,
  ...props
}) => {
  const { authDispatch, auth } = useContext(AuthContext);
  const { dispatch, menu } = useContext(MenuContext);

  const handleSetContainerClassnames = (
    clickIndex,
    strCurrentClasses,
    selectedMenuHasSubItems
  ) => {
    dispatch(
      setContainerClassnames(
        clickIndex,
        strCurrentClasses,
        selectedMenuHasSubItems
      )
    );
  };

  const handleChangeSelectedMenuHasSubItems = (hasSubMenu) => {
    dispatch(changeSelectedMenuHasSubItems(hasSubMenu));
  };

  const handleAddContainerClassname = (oldClassName, newClassName) => {
    dispatch(addContainerClassname(oldClassName, newClassName));
  };

  return (
    <div id="app-container" className={menu.containerClassnames}>
      <TopNav
        history={history}
        containerClassnames={menu.containerClassnames}
        menuClickCount={menu.menuClickCount}
        selectedMenuHasSubItems={menu.selectedMenuHasSubItems}
        subHiddenBreakpoint={menu.subHiddenBreakpoint}
        menuHiddenBreakpoint={menu.menuHiddenBreakpoint}
        userName={`${auth.data.firstName} ${auth.data.lastName}`}
        logoutUserAction={handleLogout}
      />
      <Sidebar
        menuClickCount={menu.menuClickCount}
        containerClassnames={menu.containerClassnames}
        selectedMenuHasSubItems={menu.selectedMenuHasSubItems}
        subHiddenBreakpoint={menu.subHiddenBreakpoint}
        menuHiddenBreakpoint={menu.menuHiddenBreakpoint}
        setContainerClassnames={handleSetContainerClassnames}
        changeSelectedMenuHasSubItems={handleChangeSelectedMenuHasSubItems}
        addContainerClassname={handleAddContainerClassname}
        permission={permission}
      />
      <main>
        <div className="container-fluid">{children}</div>
      </main>

      <Footer />
    </div>
  );
};

export default withRouter(AppLayout);
