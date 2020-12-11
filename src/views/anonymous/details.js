import React, { useContext, useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { Row, Card, Dropdown, Label, FormGroup, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { BillContext } from "../../context/BillContext";
import { BillActionUpdate } from "../../actions/BillAction";
import Headroom from "react-headroom";
import { scroller } from "react-scroll";
import { NavLink } from "react-router-dom";

const Details = (props) => {
  const { bill, dispatch } = useContext(BillContext);

  const [fullnme, setFullName] = useState("??");
  const [phoneNumber, setPhoneNumber] = useState("??");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("??");

  const onPayStateBills = async (e) => {
    e.preventDefault();

    dispatch(
      BillActionUpdate({
        data: {
          FullName: fullnme,
          Phone: phoneNumber,
          Email: email,
          Address: address,
        },
      })
    );
    props.history.push("/checkout");
  };

  const handleFullName = async (e) => {
    setFullName(e.target.value);
  };

  const handlePhoneNumber = async (e) => {
    setPhoneNumber(e.target.value);
  };
  const handleEmail = async (e) => {
    setEmail(e.target.value);
  };
  const handleAddress = async (e) => {
    setAddress(e.target.value);
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
          <br />

          <div className="section">
            <div className="container" id="features">
              <div className="row">
                <div className="col-12 offset-0 col-lg-8 offset-lg-2 text-center">
                  <h1>One More Step To Go.</h1>
                  <p>
                    We tried to create an admin theme that we would like to use
                    ourselves so we listed our priorities. We would like to have
                    a theme that is not over complicated to use, does the job
                    well, contains must have components and looks really nice.
                  </p>
                </div>
              </div>
              <div className="row feature-row">
                <div className="col-12 col-md-3 col-lg-3 offset-lg-1 offset-md-0 position-relative d-none d-md-block">
                  <div className="feature-text-container"></div>
                </div>
                <div className="col-12 col-md-6 col-lg-5  align-items-center">
                  <div className="feature-text-container">
                    <h2>Details</h2>
                    <Formik>
                      {({ errors, touched }) => (
                        <Form
                          className="av-tooltip tooltip-label-bottom"
                          onSubmit={onPayStateBills}
                        >
                          <input
                            className="form-control p-3"
                            name="fullname"
                            type="text"
                            placeholder="Full Name"
                            onChange={handleFullName}
                            required
                          />

                          <br />

                          <input
                            className="form-control p-3"
                            name="phone"
                            type="text"
                            placeholder="Phone Number"
                            onChange={handlePhoneNumber}
                            required
                          />

                          <br />

                          <input
                            className="form-control p-3"
                            name="email"
                            type="email"
                            placeholder="Email"
                            onChange={handleEmail}
                            required
                          />

                          <br />

                          <input
                            className="form-control p-3"
                            name="address"
                            type="text"
                            placeholder="Address"
                            onChange={handleAddress}
                          />

                          <br />

                          <div className="d-flex  align-items-center">
                            <Button
                              color="primary"
                              className={`btn btn-secondary btn-secondary-orange btn-xl mr-2 mb-2`}
                              size="lg"
                              data-toggle="modal"
                              data-target="#anonymous"
                            >
                              <span className="label">Next</span>
                            </Button>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  </div>
                </div>
                <div className="col-12 col-md-3 col-lg-3 offset-lg-1 offset-md-0 position-relative d-none d-md-block">
                  <div className="feature-text-container"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
