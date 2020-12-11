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
import PerfectScrollbar from "react-perfect-scrollbar";
import { Colxx } from "../../component/common/CustomBootstrap";
import IntlMessages from "../../helpers/IntlMessages";
import MapWithAMarker from "../../component/common/maps";

const Automobile = ({ lat = 0.0, long = 0.0, ...props }) => {
  const [email] = useState("demo@gogo.com");
  const [password] = useState("gogo123");
  const [name] = useState("Place");

  const auto = [
    {
      title: "Mayra Sibley",
      detail: "09.08.2018 - 12:45",
      thumb: "/assets/img/profiles/l-1.jpg",
    },
    {
      title: "Mimi Carreira",
      detail: "05.08.2018 - 10:20",
      thumb: "/assets/img/profiles/l-2.jpg",
    },
    {
      title: "Philip Nelms",
      detail: "05.08.2018 - 09:12",
      thumb: "/assets/img/profiles/l-3.jpg",
    },
    {
      title: "Terese Threadgill",
      detail: "01.08.2018 - 18:20",
      thumb: "/assets/img/profiles/l-4.jpg",
    },
  ];
  //   useEffect(() => {
  //     if (lat == 0 || long == 0.0) {
  //       props.history.push("/request");
  //     }
  //   }, [props]);

  const goSource = async (e) => {
    e.preventDefault();
    props.history.push("/request/source");
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
              <h2 className="mb-5">Choose Auto Type.</h2>

              <div className="places-window mb-4">
                <PerfectScrollbar
                  options={{ suppressScrollX: true, wheelPropagation: false }}
                >
                  {auto.map((ticket, index) => {
                    return (
                      <div
                        key={index}
                        className="d-flex flex-row mb-3 pb-3 border-bottom "
                      >
                        <NavLink to="#" onClick={goSource}>
                          <img
                            src={ticket.thumb}
                            alt={ticket.title}
                            className="img-thumbnail border-0 rounded-circle list-thumbnail align-self-center small"
                          />
                        </NavLink>

                        <div className="pl-3 pr-2 my-auto">
                          <NavLink to="void(0)" onClick={goSource}>
                            <p className="font-weight-medium mb-0 ">
                              {ticket.title}
                            </p>
                            <p className="text-muted mb-0 text-small">
                              {ticket.detail}
                            </p>
                          </NavLink>
                        </div>
                      </div>
                    );
                  })}
                </PerfectScrollbar>
              </div>

              <div className="d-flex justify-content-between align-items-center ">
                <NavLink to="/login">Login Here?</NavLink>
              </div>
            </Colxx>
          </Row>
        </Card>
      </Colxx>
    </Row>
  );
};

export default Automobile;
