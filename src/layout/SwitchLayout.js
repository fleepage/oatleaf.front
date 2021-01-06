import React, { useContext } from "react";
import { withRouter } from "react-router-dom";
import {
  addContainerClassname,
  changeSelectedMenuHasSubItems,
  setContainerClassnames,
} from "../actions/MenuActions";
import Footer from "../component/navs/Footer";
import SwitchNav from "../component/navs/SwitchNav";
import { AuthContext } from "../context/AuthContext";
import { MenuContext } from "../context/MenuContext";

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

      <main style={{ marginLeft: "100px" }}>
        <div className="container-fluid">{children}</div>
      </main>

      <Footer />
    </div>
  );
};

export default withRouter(SwitchLayout);
