import React from "react";
import { NavLink } from "react-router-dom";
import { Card, CardBody } from "reactstrap";
import { accountRoot } from "../../constants/defaultValues";

const customStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    background: "rgba(0, 0, 0, 0)",
    border: "none",
    transform: "translate(-50%, -50%)",
  },
};

const ParentCard = ({
  icon = "school.png",
  title = "title",
  detail = "detail",
  to = "",
  history,
}) => {
  return (
    <>
      <NavLink to={`${accountRoot}/${to}`}>
        <Card className="primary-banner">
          <CardBody className="justify-content-between d-flex flex-row align-items-center">
            <div>
              <img
                src={`https://localhost:44319/logo/${icon}`}
                className="rounded-circle"
                width="100px"
              />
              {/* <i
              
                className={`${icon} mr-2 text-white align-text-bottom d-inline-block`}
              /> */}
            </div>
            <div>
              <div className="ml-5 mb-0">
                <h2>{title}</h2>
                <p className="text-medium">Hello</p>
                <p className="text-medium">{detail}</p>
              </div>
            </div>
          </CardBody>
        </Card>
      </NavLink>
    </>
  );
};
export default React.memo(ParentCard);
