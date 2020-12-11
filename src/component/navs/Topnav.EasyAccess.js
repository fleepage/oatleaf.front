import React from 'react';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import IntlMessages from '../../helpers/IntlMessages';
import { adminRoot } from '../../constants/defaultValues';

const TopnavEasyAccess = () => {
  return (
    <div className="position-relative d-none d-sm-inline-block">
      <UncontrolledDropdown className="dropdown-menu-right">
        <DropdownToggle className="header-icon" color="empty">
          <i className="simple-icon-grid" />
        </DropdownToggle>
        <DropdownMenu
          className="position-absolute mt-3"
          right
          id="iconMenuDropdown"
        >
          <NavLink to={`${adminRoot}/home`} className="icon-menu-item">
            <i className="simple-icon-home d-block" />{' '}
            <IntlMessages id="menu.home" />
          </NavLink>

          <NavLink to={`${adminRoot}/state-bill`} className="icon-menu-item">
            <i className="iconsminds-the-white-house d-block" />{' '}
            <IntlMessages id="state Bill" />
          </NavLink>
          <NavLink to={`${adminRoot}/utility-bill`} className="icon-menu-item">
            <i className="iconsminds-communication-tower-2 d-block" />{' '}
            <IntlMessages id="utility Bill" />
          </NavLink>
          <NavLink to={`${adminRoot}/history`} className="icon-menu-item">
            <i className="simple-icon-clock d-block" />{' '}
            <IntlMessages id="history" />
          </NavLink>
          
        </DropdownMenu>
      </UncontrolledDropdown>
    </div>
  );
};

export default TopnavEasyAccess;
