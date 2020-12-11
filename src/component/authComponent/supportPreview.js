import React, { createRef, useState, useContext } from "react";
import {
  Badge,
  Row,
  Card,
  CardBody,
  Button,
  CardTitle,
  Table,
  CardFooter,
  NavItem,
} from "reactstrap";
import { Colxx, Separator } from "../../component/common/CustomBootstrap";
import moment from "moment";

const SupportPreview = ({ match, ...props }) => {
  const [isEmpty, setIsEmpty] = useState(true);
  return (
    <>
      {" "}
      <Card>
        <CardTitle className="p-4">Support Ticket</CardTitle>
        {!isEmpty && (
          <CardBody>
            <div className="mb-5">
              <Row>
                <Colxx md="12">
                  <h3>Technical Issue</h3>
                </Colxx>
              </Row>
              <Row>
                <Colxx md="12">
                  By using ercasConnect you have agreed to our terms and
                  conditions.By using ercasConnect you have agreed to our terms
                  and conditions.
                </Colxx>
              </Row>
              <br />
              <Row>
                <Colxx md="6">{moment().calendar()}</Colxx>
                <Colxx md="6">
                  <Badge color="secondary" pill className="mb-1">
                    Processing
                  </Badge>
                </Colxx>
              </Row>
            </div>

            <div className="mb-5">
              <Row>
                <Colxx md="12">
                  <h3>Payment Issue</h3>
                </Colxx>
              </Row>
              <Row>
                <Colxx md="12">
                  By using ercasConnect you have agreed to our terms and
                  conditions.By using ercasConnect you have agreed to our terms
                  and conditions.
                </Colxx>
              </Row>
              <br />
              <Row>
                <Colxx md="6">{moment().calendar()}</Colxx>
                <Colxx md="6">
                  <Badge color="success" pill className="mb-1">
                    Completed
                  </Badge>
                </Colxx>
              </Row>
            </div>

            <div className="mb-5">
              <Row>
                <Colxx md="12">
                  <h3>Technical Issue</h3>
                </Colxx>
              </Row>
              <Row>
                <Colxx md="12">
                  By using ercasConnect you have agreed to our terms and
                  conditions.By using ercasConnect you have agreed to our terms
                  and conditions.
                </Colxx>
              </Row>
              <br />
              <Row>
                <Colxx md="6">{moment().calendar()}</Colxx>
                <Colxx md="6">
                  <Badge color="danger" pill className="mb-1">
                    Canclled
                  </Badge>
                </Colxx>
              </Row>
            </div>
          </CardBody>
        )}
        {isEmpty && (
          <CardBody>
            <div className="text-center">
              <img
                src="/assets/img/utilities/empty-support.png"
                style={{ width: "50%", height: "50%" }}
              />
              <h2>Nothing to show</h2>
            </div>
          </CardBody>
        )}
        {!isEmpty && (
          <CardFooter>
            <Button color="primary" block className="mb-2">
              View All
            </Button>
          </CardFooter>
        )}
      </Card>
    </>
  );
};
export default SupportPreview;
