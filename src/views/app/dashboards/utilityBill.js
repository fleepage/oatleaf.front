import React from "react";
import { injectIntl } from "react-intl";
import { Row } from "reactstrap";
import { Colxx, Separator } from "../../../component/common/CustomBootstrap";
import Breadcrumb from "../../../component/navs/Breadcrumb";
import UtilityBillForm from "../../../component/authComponent/utilityBillForm";

const UtilityBills = ({ intl, match }) => {
  const { messages } = intl;
  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="Utility Bill" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        <Colxx className="mb-5">
          <UtilityBillForm />
        </Colxx>
        <Colxx xxs="2" className="d-none d-md-block"></Colxx>
      </Row>
    </>
  );
};
export default injectIntl(UtilityBills);
