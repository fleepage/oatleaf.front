import React, { useState, useContext, useEffect } from "react";

import {
  Row,
  Card,
  CardTitle,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import { NavLink } from "react-router-dom";

import { Colxx } from "../../component/common/CustomBootstrap";
import IntlMessages from "../../helpers/IntlMessages";
import MapWithAMarker from "../../component/common/maps";

const Preview = ({ lat = 0.0, long = 0.0, ...props }) => {
  const [email] = useState("demo@gogo.com");
  const [password] = useState("gogo123");
  const [name] = useState("Place");

  //   useEffect(() => {
  //     if (lat == 0 || long == 0.0) {
  //       props.history.push("/request");
  //     }
  //   }, [props]);
  const gotoPayment = async () => {
    props.history.push("/request/payment");
  };
  return (
    <Row className="h-100">
      <Colxx xxs="12" md="10" className="mx-auto my-auto">
        <Card>
          <Row>
            <Colxx xxs="6 " className="d-none d-md-block">
              {/* <MapWithAMarker /> */}
            </Colxx>
            <Colxx className="text-center pt-5 pb-5 pr-5 pl-5">
              <div className="places-window mb-4">
                <p className="mx-auto my-auto">sdsds</p>
              </div>

              <div className="d-flex justify-content-between align-items-center ">
                <NavLink to="/login">Login Here?</NavLink>
                <Button
                  color="primary"
                  className="btn-shadow"
                  size="lg"
                  onClick={gotoPayment}
                >
                  Next
                </Button>
              </div>
            </Colxx>
          </Row>
        </Card>
      </Colxx>
    </Row>
  );
};

export default Preview;
