import React, { useContext } from "react";
import { injectIntl } from "react-intl";
import { Row } from "reactstrap";
import StudentAccountCard from "../../../component/cards/StudentAccountCard";
import { Colxx, Separator } from "../../../component/common/CustomBootstrap";
import Breadcrumb from "../../../component/navs/Breadcrumb";
import { AccountContext } from "../../../context/AccountContext";

const StudentDetail = ({ intl, match, ...props }) => {
  const accountContext = useContext(AccountContext);
  const { messages } = intl;

  // useEffect(async () => {
  //   console.log(accountContext.account);
  // }, []);

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="DashBoard" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row className="app-row survey-app">
        <Colxx xxs="12">
          <StudentAccountCard />
        </Colxx>
      </Row>
    </>
  );
};
export default injectIntl(StudentDetail);
