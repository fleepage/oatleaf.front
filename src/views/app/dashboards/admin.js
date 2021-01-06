import React, { useContext } from "react";
import { injectIntl } from "react-intl";
import LinesEllipsis from "react-lines-ellipsis";
import responsiveHOC from "react-lines-ellipsis/lib/responsiveHOC";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Button, Row } from "reactstrap";
import SupportPreview from "../../../component/authComponent/supportPreview";
import SubCard from "../../../component/cards/IconCard";
import DashboardIconsCard from "../../../component/carousel/dashboardCards";
import { Colxx, Separator } from "../../../component/common/CustomBootstrap";
import ApplicationMenu from "../../../component/navs/ApplicationMenu";
import Breadcrumb from "../../../component/navs/Breadcrumb";
import TopnavDarkSwitch from "../../../component/navs/Topnav.DarkSwitch";
import ErcasTransactionTable from "../../../component/table/ErcasReactTable";
import { isDarkSwitchActive } from "../../../constants/defaultValues";
import { AccountContext } from "../../../context/AccountContext";

const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis);
const Admin = ({ intl, match, ...props }) => {
  const accountContext = useContext(AccountContext);
  const { messages } = intl;

  // useEffect(async () => {
  //   console.log(accountContext.account);
  // }, []);

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
            <Button
              block
              color="primary"
              size="xs"
              className="mb-2"
              onClick={() => props.history.push("/accounts")}
            >
              Switch Account
            </Button>
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
