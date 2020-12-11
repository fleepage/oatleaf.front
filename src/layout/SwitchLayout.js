import React, { useContext } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { MenuContext } from "../context/MenuContext";
import TopNav from "../component/navs/Topnav";
import SwitchSidebar from "../component/navs/SwitchSidebar";
import Footer from "../component/navs/Footer";
import { AuthContext } from "../context/AuthContext";
import {
  setContainerClassnames,
  addContainerClassname,
  changeDefaultClassnames,
  changeSelectedMenuHasSubItems,
} from "../actions/MenuActions";
import { UserRole } from "../constants/authHelper";
import SwitchNav from "../component/navs/SwitchNav";

const SwitchLayout = ({
  containerClassnames,
  children,
  history,
  permission,
  handleLogout,
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
      <SwitchNav
        history={history}
        containerClassnames={menu.containerClassnames}
        menuClickCount={menu.menuClickCount}
        selectedMenuHasSubItems={menu.selectedMenuHasSubItems}
        subHiddenBreakpoint={menu.subHiddenBreakpoint}
        menuHiddenBreakpoint={menu.menuHiddenBreakpoint}
        userName={`${auth.data.firstName} ${auth.data.lastName}`}
        logoutUserAction={handleLogout}
        {...props}
      />
      {/* <SwitchSidebar
        menuClickCount={menu.menuClickCount}
        containerClassnames={menu.containerClassnames}
        selectedMenuHasSubItems={menu.selectedMenuHasSubItems}
        subHiddenBreakpoint={menu.subHiddenBreakpoint}
        menuHiddenBreakpoint={menu.menuHiddenBreakpoint}
        setContainerClassnames={handleSetContainerClassnames}
        changeSelectedMenuHasSubItems={handleChangeSelectedMenuHasSubItems}
        addContainerClassname={handleAddContainerClassname}
        permission={permission}
      /> */}

      <main>
        <div className="container-fluid">{children}</div>
      </main>

      <Footer />
    </div>
  );
};

export default withRouter(SwitchLayout);
