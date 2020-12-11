import React, { useState, useEffect } from "react";
import Breadcrumb from "../../../component/navs/Breadcrumb";
import { Colxx, Separator } from "../../../component/common/CustomBootstrap";
import { Row, Card, CardBody, CardTitle, Table, CardFooter } from "reactstrap";
import ErcasTransactionTable from "../../../component/table/ErcasReactTable";
const History = ({ match, ...props }) => {
  // (
  //   <div className="loading" />
  // )

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="History" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <ErcasTransactionTable
        title={"Transactions"}
        {...props}
        match={match}
        defaultPageSize={20}
      />
    </>
  );
};

export default History;
