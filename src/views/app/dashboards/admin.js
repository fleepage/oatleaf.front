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

const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis);
const Admin = ({ intl, match, ...props }) => {
  const { messages } = intl;
  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="DashBoard" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        <Colxx lg="4" md="6" className="mb-4">
          <GradientWithRadialProgressCard
            icon="iconsminds-the-white-house"
            title={`State Bills`}
            detail={"Click here to pay your state bills"}
            to="state-bill"
          />
        </Colxx>
        <Colxx lg="4" md="6" className="mb-4">
          <GradientWithRadialProgressCard
            icon="iconsminds-communication-tower-2"
            title={`Utility Bill`}
            detail={"Click here to pay your utility bills"}
            to="utility-bill"
          />
        </Colxx>
        <Colxx lg="4" md="6" className="mb-4 d-none d-md-block">
          <GradientWithRadialProgressCard
            icon=""
            title={``}
            detail={""}
            to="home"
          />
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
    </>
  );
};
export default injectIntl(Admin);
