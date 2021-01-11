import React from "react";
import { Row } from "reactstrap";
import { Colxx } from "../../component/common/CustomBootstrap";

const ParentSetup = ({ intl, match, ...props }) => {
  return (
    <>
      <Row>
        <Colxx xxs="12">
          <h1>Setup Parent</h1>
        </Colxx>
      </Row>
    </>
  );
};
export default ParentSetup;
