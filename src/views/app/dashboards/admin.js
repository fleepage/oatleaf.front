import React from "react";
import { injectIntl } from "react-intl";
import { Row } from "reactstrap";
import { Colxx, Separator } from "../../../component/common/CustomBootstrap";
import Breadcrumb from "../../../component/navs/Breadcrumb";
import GradientWithRadialProgressCard from "../../../component/cards/GradientWithRadialProgressCard";
import { NavLink } from "react-router-dom";
import LinesEllipsis from "react-lines-ellipsis";
import responsiveHOC from "react-lines-ellipsis/lib/responsiveHOC";
import ErcasTransactionTable from "../../../component/table/ErcasReactTable";
import moment from "moment";
import SupportPreview from "../../../component/authComponent/supportPreview";
import ApplicationMenu from "../../../component/navs/ApplicationMenu";
import PerfectScrollbar from "react-perfect-scrollbar";
import TopnavDarkSwitch from "../../../component/navs/Topnav.DarkSwitch";
import { isDarkSwitchActive } from "../../../constants/defaultValues";
import DashboardIconsCard from "../../../component/carousel/dashboardCards";
import SubCard from "../../../component/cards/IconCard";

const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis);
const Admin = ({ intl, match, ...props }) => {
  const { messages } = intl;
  return (
    <>
      <Row className="app-row survey-app">
        <Colxx xxs="12">
          <Row>
            <Colxx xxs="12">
              <Breadcrumb heading="DashBoard" match={match} />
              <Separator className="mb-5" />
            </Colxx>
          </Row>
          <Row>
            <Colxx lg="12">
              <DashboardIconsCard />
            </Colxx>
          </Row>
          <Row>
            <Colxx>
              <ErcasTransactionTable
                {...props}
                match={match}
                pagination={false}
                defaultPageSize={5}
                showOrderBy={false}
                showFilterBy={false}
              />
            </Colxx>
            <Colxx md="4">
              <SupportPreview />
            </Colxx>
          </Row>
        </Colxx>
      </Row>
      <ApplicationMenu>
        <PerfectScrollbar
          options={{ suppressScrollX: true, wheelPropagation: false }}
        >
          <div className="p-4">
            <p className="text-muted text-small">
              {/* <IntlMessages id="todo.status" /> */}
              Preference
            </p>
            <ul className="list-unstyled mb-5">
              Dark Mode: {isDarkSwitchActive && <TopnavDarkSwitch />}
            </ul>
          </div>
          <div className="p-4">
            <SubCard
              {...{
                title: "refund-requests",
                icon: "iconsminds-arrow-refresh",
                value: 74,
              }}
            />
          </div>
        </PerfectScrollbar>
      </ApplicationMenu>
    </>
  );
};
export default injectIntl(Admin);
