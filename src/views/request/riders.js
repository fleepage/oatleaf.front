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

const Riders = ({ lat = 0.0, long = 0.0, ...props }) => {
  const [email] = useState("demo@gogo.com");
  const [password] = useState("gogo123");
  const [name] = useState("Place");

  const tickets = [
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
    {
      title: "Kathryn Mengel",
      detail: "27.07.2018 - 11:45",
      thumb: "/assets/img/profiles/l-5.jpg",
    },
    {
      title: "Esperanza Lodge",
      detail: "24.07.2018 - 15:00",
      thumb: "/assets/img/profiles/l-2.jpg",
    },
    {
      title: "Laree Munsch",
      detail: "24.05.2018 - 11:00",
      thumb: "/assets/img/profiles/l-1.jpg",
    },
  ];

  //   useEffect(() => {
  //     if (lat == 0 || long == 0.0) {
  //       props.history.push("/request");
  //     }
  //   }, [props]);

  const goAuto = async (e) => {
    e.preventDefault();
    props.history.push("/request/auto");
  };

  return (
    <Row className="h-100">
      <Colxx xxs="12" md="10" className="mx-auto my-auto">
        <Card>
          <Row>
            <Colxx xxs="6 " className="d-none d-md-block">
              {/* <MapWithAMarker /> */}
            </Colxx>
            <Colxx className="pt-5 pb-5 pr-5 pl-5">
              <h2>Choose A Rider.</h2>
              <FormGroup className="form-group  mb-4">
                <Input type="name" placeholder={"Search..."} />
              </FormGroup>
              <div className="places-window mb-4">
                <PerfectScrollbar
                  options={{ suppressScrollX: true, wheelPropagation: false }}
                >
                  {tickets.map((ticket, index) => {
                    return (
                      <div
                        key={index}
                        className="d-flex flex-row mb-3 pb-3 border-bottom"
                      >
                        <NavLink to="#" onClick={goAuto}>
                          <img
                            src={ticket.thumb}
                            alt={ticket.title}
                            className="img-thumbnail border-0 rounded-circle list-thumbnail align-self-center xsmall"
                          />
                        </NavLink>

                        <div className="pl-3 pr-2">
                          <NavLink to="void(0)" onClick={goAuto}>
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

              <div className="d-flex justify-content-center align-items-center ">
                <Button
                  color="primary"
                  className="btn-shadow"
                  size="lg"
                  onClick={goAuto}
                >
                  Let Pocketlogistic choose for me
                </Button>
              </div>
            </Colxx>
          </Row>
        </Card>
      </Colxx>
    </Row>
  );
};

export default Riders;
