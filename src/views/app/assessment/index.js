import React, { useContext } from "react";
import { injectIntl } from "react-intl";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Row } from "reactstrap";
import VerticalStatCard from "../../../component/carousel/verticalStatCard";
import { Colxx, Separator } from "../../../component/common/CustomBootstrap";
import ApplicationMenu from "../../../component/navs/ApplicationMenu";
import Breadcrumb from "../../../component/navs/Breadcrumb";
import { ReactTableDivided } from "../../../component/table/Table";
import { AccountContext } from "../../../context/AccountContext";

const Assessment = ({ intl, match, ...props }) => {
  const accountContext = useContext(AccountContext);
  const { messages } = intl;

  // useEffect(async () => {
  //   console.log(accountContext.account);
  // }, []);

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="Assessment" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row className="app-row survey-app">
        <Colxx xxs="12">
          <ReactTableDivided /> a
        </Colxx>
      </Row>
      <ApplicationMenu>
        <PerfectScrollbar
          options={{ suppressScrollX: true, wheelPropagation: false }}
        >
          <Row>
            <Colxx lg="12" className="pt-5">
              <VerticalStatCard />
            </Colxx>
          </Row>
        </PerfectScrollbar>
      </ApplicationMenu>
    </>
  );
};
export default injectIntl(Assessment);
