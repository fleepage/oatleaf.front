import React from "react";
import { injectIntl } from "react-intl";
import { Row } from "reactstrap";
import { Colxx, Separator } from "../../../component/common/CustomBootstrap";
import Breadcrumb from "../../../component/navs/Breadcrumb";
import ErcasSpportTable from "../../../component/table/ErcasSupportTicket";

const ContactUs = ({ intl, match }) => {
  const { messages } = intl;
  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="Support" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        <Colxx md="12">
          <ErcasSpportTable showAdd />
        </Colxx>
      </Row>
    </>
  );
};
export default injectIntl(ContactUs);
