import React, { useContext, useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { Row, Card, Dropdown, Label, FormGroup, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { BillContext } from "../../context/BillContext";
import { Colxx } from "../../component/common/CustomBootstrap";
import CircularProgress from "@material-ui/core/CircularProgress";
import Headroom from "react-headroom";
import { scroller } from "react-scroll";

const Completed = ({ ...props }) => {
  const { bill, dispatch } = useContext(BillContext);
  const [isSuccessful, setIsSuccessful] = useState(true);
  const [isPaying, setIsPaying] = useState(false);

  const redirectUrl = "/completed";

  const handleGoHome = async () => {
    props.history.push("/");
  };

  const scrollTo = (event, target) => {
    event.preventDefault();
    scroller.scrollTo(target, {
      duration: 500,
      delay: 0,
      smooth: "easeInOutQuart",
      offset: -100,
    });
    return false;
  };

  return (
    <div className="landing-page">
      <div className="main-container">
        <Headroom className="landing-page-nav">
          <nav>
            <div className="container d-flex align-items-center justify-content-between">
              <a
                className="navbar-ercas-logo pull-left c-pointer"
                href="#scroll"
                onClick={(event) => scrollTo(event, "home")}
              >
                <span className="white"></span>
                <span className="dark"></span>
              </a>
            </div>
          </nav>
        </Headroom>
        <div className="content-container" id="home">
          <div className="section">
            <div className="container" id="features">
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              {!isPaying && isSuccessful && (
                <Row>
                  <Colxx xxs="12" className="text-center">
                    <h1>Payment is Successful.</h1>
                    <p>
                      Your payment has been recorded successfully, Pleas check
                      your mailbox for receipt of payment or{" "}
                      <a href="ercas.com.ng">signup</a> to track your payment
                      history
                    </p>
                    <div className="align-items-center">
                      <Button
                        color="primary"
                        className={`btn btn-secondary btn-secondary-orange btn-xl mr-2 mb-2`}
                        size="lg"
                        onClick={handleGoHome}
                      >
                        <span className="label">Go Home</span>
                      </Button>
                    </div>
                  </Colxx>
                </Row>
              )}
              {isPaying && (
                <Row>
                  <Colxx xmd="12" className="text-center">
                    <CircularProgress color="primary" />
                    <p>Processing payment...please wait</p>
                  </Colxx>
                </Row>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Completed;
