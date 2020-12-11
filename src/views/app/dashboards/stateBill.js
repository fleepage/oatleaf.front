import React, { useState } from "react";
import { injectIntl } from "react-intl";
import { Row } from "reactstrap";
import { Colxx, Separator } from "../../../component/common/CustomBootstrap";
import Breadcrumb from "../../../component/navs/Breadcrumb";
import StateBillForm from "../../../component/authComponent/stateBillForm";

const StateBills = ({ intl, match, ...props }) => {
  const { messages } = intl;
  const [hideRight, setHideRight] = useState(false);
  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="State Bill" match={match} />
          {/* <Separator className="mb-5" /> */}
        </Colxx>
      </Row>
      <Row>
        <Colxx className="mb-5">
          <StateBillForm handleHideRight={setHideRight} {...props} />
        </Colxx>
        {!hideRight && <Colxx xxs="2" className="d-none d-md-block"></Colxx>}
      </Row>
    </>
  );
};
export default injectIntl(StateBills);
