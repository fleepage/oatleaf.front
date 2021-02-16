import React, { useContext } from "react";
import { injectIntl } from "react-intl";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Row } from "reactstrap";
import VerticalStatCard from "../../../component/carousel/verticalStatCard";
import { Colxx } from "../../../component/common/CustomBootstrap";
import ThumbListPages from "../../../component/DataList/ThumbList";
import ApplicationMenu from "../../../component/navs/ApplicationMenu";
import { AccountContext } from "../../../context/AccountContext";

const Parents = ({ intl, match, ...props }) => {
  const accountContext = useContext(AccountContext);
  const { messages } = intl;

  // useEffect(async () => {
  //   console.log(accountContext.account);
  // }, []);

  return (
    <>
      <Row className="app-row survey-app">
        <Colxx xxs="12">
          <ThumbListPages match={match} />
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
export default injectIntl(Parents);
