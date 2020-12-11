/* eslint-disable react/no-danger */
import React, { useEffect, useState } from "react";
import { Row, Card, CardBody, Table } from "reactstrap";
import queryString from "query-string";
import Breadcrumb from "../../../component/navs/Breadcrumb";
import { Separator, Colxx } from "../../../component/common/CustomBootstrap";
import IntlMessages from "../../../helpers/IntlMessages";

const Receipt = ({ match, ...props }) => {
  const [receipt, setReceipt] = useState("");

  useEffect(() => {
    const values = queryString.parse(props.location.search);
    setReceipt(values.p);
  }, []);
  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="Receipt" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>

      <Row className="invoice-react">
        <Colxx xxs="2" className="d-none d-md-block"></Colxx>
        <Colxx className="mb-5">
          <Card className="mb-5 invoice-contents">
            <CardBody className="d-flex flex-column justify-content-between">
              <div className="d-flex flex-column">
                <div className="d-flex flex-row justify-content-between pt-2 pb-2">
                  <div className="d-flex align-self-center">
                    <img src="/assets/logos/ercas.png" alt="Logo" />
                  </div>
                  <div className="d-flex w-30 text-right align-self-center">
                    <p className="text-small text-semi-muted mb-0">
                      ColoredStrategies Inc 35 Little Russell St. Bloomsburg
                      London,UK
                      <br />
                      784 451 12 47
                    </p>
                  </div>
                </div>
                <div className="border-bottom pt-4 mb-5" />

                <div className="d-flex flex-row justify-content-between mb-5">
                  <div className="d-flex flex-column w-70 mr-2 p-4 text-semi-muted bg-semi-muted">
                    <p className="mb-0">Latashia Nagy</p>
                    <p className="mb-0">
                      100-148 Warwick Trfy, Kansas City, USA
                    </p>
                  </div>
                  <div className="d-flex w-30 flex-column text-right p-4 text-semi-muted bg-semi-muted">
                    <p className="mb-0">Invoice #: 741</p>
                    <p className="mb-0">02.02.2019</p>
                  </div>
                </div>

                <Table borderless>
                  <thead>
                    <tr>
                      <th className="text-muted text-extra-small mb-2">
                        ITEM NAME
                      </th>
                      <th className="text-muted text-extra-small mb-2">
                        COUNT
                      </th>
                      <th className="text-right text-muted text-extra-small mb-2">
                        PRICE
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Marble Cake</td>
                      <td>3 pcs</td>
                      <td className="text-right">$ 14.82</td>
                    </tr>
                    <tr>
                      <td>Chocolate Cake</td>
                      <td>2 pcs</td>
                      <td className="text-right">$ 8.97</td>
                    </tr>
                    <tr>
                      <td>Fat Rascal</td>
                      <td>2 pcs</td>
                      <td className="text-right">$ 18.24</td>
                    </tr>
                    <tr>
                      <td>Cremeschnitte</td>
                      <td>2 pcs</td>
                      <td className="text-right">$ 4.24</td>
                    </tr>
                    <tr>
                      <td>Cheesecake</td>
                      <td>3 pcs</td>
                      <td className="text-right">$ 6.27</td>
                    </tr>
                    <tr>
                      <td>Magdalena</td>
                      <td>2 pcs</td>
                      <td className="text-right">$ 10.97</td>
                    </tr>
                    <tr>
                      <td>Genoise</td>
                      <td>2 pcs</td>
                      <td className="text-right">$ 21.24</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
              <div className="d-flex flex-column">
                <div className="border-bottom pt-3 mb-5" />
                <Table borderless className="d-flex justify-content-end">
                  <tbody>
                    <tr>
                      <td className="text-semi-muted">Subtotal :</td>
                      <td className="text-right">$ 61.82</td>
                    </tr>
                    <tr>
                      <td className="text-semi-muted">Tax :</td>
                      <td className="text-right">$ 61.82</td>
                    </tr>
                    <tr>
                      <td className="text-semi-muted">Shipping :</td>
                      <td className="text-right">$ 3.21</td>
                    </tr>
                    <tr className="font-weight-bold">
                      <td className="text-semi-muted">Total :</td>
                      <td className="text-right">$ 68.14</td>
                    </tr>
                  </tbody>
                </Table>
                <div className="border-bottom pt-3 mb-5" />
                <p className="text-muted text-small text-center">
                  Invoice was created on a computer and is valid without the
                  signature and seal.{" "}
                </p>
              </div>
            </CardBody>
          </Card>
        </Colxx>
        <Colxx xxs="2" className="d-none d-md-block"></Colxx>
      </Row>
    </>
  );
};

export default Receipt;
