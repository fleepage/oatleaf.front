import React, { useContext } from "react";
import { injectIntl } from "react-intl";
import LinesEllipsis from "react-lines-ellipsis";
import responsiveHOC from "react-lines-ellipsis/lib/responsiveHOC";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Button, Row } from "reactstrap";
import SubCard from "../../../component/cards/IconCard";
import DashboardIconsCard from "../../../component/carousel/dashboardCards";
import { Colxx, Separator } from "../../../component/common/CustomBootstrap";
import ApplicationMenu from "../../../component/navs/ApplicationMenu";
import Breadcrumb from "../../../component/navs/Breadcrumb";
import TopnavDarkSwitch from "../../../component/navs/Topnav.DarkSwitch";
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
      <Row>
        <Colxx lg="10" md="10">
          <Breadcrumb heading="DashBoard" match={match} />
        </Colxx>
        <Colxx lg="2" md="2">
          Dark Mode: {isDarkSwitchActive && <TopnavDarkSwitch />}
          {/* <Button
            block
            color="primary"
            size="xs"
            className="mb-2"
            onClick={() => props.history.push("/accounts")}
          >
            Switch Account
          </Button> */}
        </Colxx>
      </Row>
      <Row>
        <Colxx xxs="12">
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        <Colxx lg="12">
          <DashboardIconsCard />
        </Colxx>
      </Row>
      {false && (
        <ApplicationMenu>
          <PerfectScrollbar
            options={{ suppressScrollX: true, wheelPropagation: false }}
          >
            <div className="p-4">
              <p className="text-muted text-small">
                {/* <IntlMessages id="todo.status" /> */}
                Preference
              </p>
              <ul className="list-unstyled">
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
      )}
    </>
  );
};
export default injectIntl(Admin);
