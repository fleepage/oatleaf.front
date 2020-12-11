/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-use-before-define */
import React, { useState, useContext } from "react";
import { injectIntl } from "react-intl";

import {
  UncontrolledDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  Input,
} from "reactstrap";

import { NavLink } from "react-router-dom";
import ThumbnailLetters from "../cards/ThumbnailLetters";

import IntlMessages from "../../helpers/IntlMessages";

import {
  setContainerClassnames,
  clickOnMobileMenu,
  logoutUser,
  changeLocale,
} from "../../actions/MenuActions";

import { MenuContext } from "../../context/MenuContext";

import {
  menuHiddenBreakpoint,
  searchPath,
  localeOptions,
  isDarkSwitchActive,
  buyUrl,
  adminRoot,
} from "../../constants/defaultValues";

import { MobileMenuIcon, MenuIcon } from "../../component/svg";
import TopnavEasyAccess from "./Topnav.EasyAccess";
import TopnavDarkSwitch from "./Topnav.DarkSwitch";

import { getDirection, setDirection } from "../../helpers/Utils";

const SwitchNav = ({
  intl,
  history,
  containerClassnames,
  menuClickCount,
  selectedMenuHasSubItems,
  locale,
  logoutUserAction,
  changeLocaleAction,
  userName = "",
  ...props
}) => {
  const { dispatch, menu } = useContext(MenuContext);
  const [isInFullScreen, setIsInFullScreen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [accountActions, setAccountActions] = useState([
    { id: 1, name: "Dashboard" },
    { id: 2, name: "Setup a School" },
    { id: 3, name: "Setup an Organisation" },
  ]);

  const search = () => {
    history.push(`${searchPath}?key=${searchKeyword}`);
    setSearchKeyword("");
  };

  const isInFullScreenFn = () => {
    return (
      (document.fullscreenElement && document.fullscreenElement !== null) ||
      (document.webkitFullscreenElement &&
        document.webkitFullscreenElement !== null) ||
      (document.mozFullScreenElement &&
        document.mozFullScreenElement !== null) ||
      (document.msFullscreenElement && document.msFullscreenElement !== null)
    );
  };

  const handleSearchInputKeyPress = (e) => {
    if (e.key === "Enter") {
      search();
    }
  };

  const handleSearchIconClick = (e) => {
    if (window.innerWidth < menuHiddenBreakpoint) {
      let elem = e.target;
      if (!e.target.classList.contains("search")) {
        if (e.target.parentElement.classList.contains("search")) {
          elem = e.target.parentElement;
        } else if (
          e.target.parentElement.parentElement.classList.contains("search")
        ) {
          elem = e.target.parentElement.parentElement;
        }
      }

      if (elem.classList.contains("mobile-view")) {
        search();
        elem.classList.remove("mobile-view");
        removeEventsSearch();
      } else {
        elem.classList.add("mobile-view");
        addEventsSearch();
      }
    } else {
      search();
    }
    e.stopPropagation();
  };
  const handleDocumentClickSearch = (e) => {
    let isSearchClick = false;
    if (
      e.target &&
      e.target.classList &&
      (e.target.classList.contains("navbar") ||
        e.target.classList.contains("simple-icon-magnifier"))
    ) {
      isSearchClick = true;
      if (e.target.classList.contains("simple-icon-magnifier")) {
        search();
      }
    } else if (
      e.target.parentElement &&
      e.target.parentElement.classList &&
      e.target.parentElement.classList.contains("search")
    ) {
      isSearchClick = true;
    }

    if (!isSearchClick) {
      const input = document.querySelector(".mobile-view");
      if (input && input.classList) input.classList.remove("mobile-view");
      removeEventsSearch();
      setSearchKeyword("");
    }
  };

  const removeEventsSearch = () => {
    document.removeEventListener("click", handleDocumentClickSearch, true);
  };

  const toggleFullScreen = () => {
    const isFS = isInFullScreenFn();

    const docElm = document.documentElement;
    if (!isFS) {
      if (docElm.requestFullscreen) {
        docElm.requestFullscreen();
      } else if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen();
      } else if (docElm.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen();
      } else if (docElm.msRequestFullscreen) {
        docElm.msRequestFullscreen();
      }
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
    setIsInFullScreen(!isFS);
  };

  const handleLogout = () => {
    logoutUserAction(history);
  };

  const addEventsSearch = () => {
    document.addEventListener("click", handleDocumentClickSearch, true);
  };

  const handleAccountAction = (id) => {
    if (id === 1) {
      props.history.push("/accounts");
    } else if (id === 2) {
    } else {
    }
  };

  const { messages } = intl;
  return (
    <nav className="navbar fixed-top">
      <div className="d-flex align-items-center navbar-left">
        <div className="search ml-5">
          <Input
            name="searchKeyword"
            id="searchKeyword"
            placeholder={"search oatleaf"}
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            onKeyPress={(e) => handleSearchInputKeyPress(e)}
          />
          <span
            className="search-icon"
            onClick={(e) => handleSearchIconClick(e)}
          >
            <i className="simple-icon-magnifier" />
          </span>
        </div>
        <div className="d-inline-block">
          <UncontrolledDropdown className="ml-2">
            <DropdownToggle
              caret
              color="light"
              size="sm"
              className="language-button"
            >
              <span className="name">Accounts</span>
            </DropdownToggle>
            <DropdownMenu className="mt-3" right>
              {accountActions.map((l) => {
                return (
                  <DropdownItem
                    onClick={() => handleAccountAction(l.id)}
                    key={l.id}
                  >
                    {l.name}
                  </DropdownItem>
                );
              })}
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      </div>
      <NavLink className="navbar-logo" to={adminRoot}>
        <span className="logo d-none d-xs-block" />
        <span className="logo-mobile d-block d-xs-none" />
      </NavLink>

      <div className="navbar-right">
        {isDarkSwitchActive && <TopnavDarkSwitch />}
        <div className="header-icons d-inline-block align-middle">
          <button
            className="header-icon btn btn-empty d-none d-sm-inline-block"
            type="button"
            id="fullScreenButton"
            onClick={toggleFullScreen}
          >
            {isInFullScreen ? (
              <i className="simple-icon-size-actual d-block" />
            ) : (
              <i className="simple-icon-size-fullscreen d-block" />
            )}
          </button>
        </div>
        <div className="user d-inline-block">
          <UncontrolledDropdown className="dropdown-menu-right">
            <DropdownToggle className="p-0" color="empty">
              <ThumbnailLetters rounded small text={userName} />
            </DropdownToggle>
            <DropdownMenu className="mt-3" right>
              <DropdownItem>Account</DropdownItem>
              <DropdownItem>Features</DropdownItem>
              <DropdownItem>History</DropdownItem>
              <DropdownItem>Support</DropdownItem>
              <DropdownItem divider />
              <DropdownItem onClick={() => handleLogout()}>
                Sign out
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      </div>
    </nav>
  );
};

export default injectIntl(SwitchNav);
