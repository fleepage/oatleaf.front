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

const GradientCard = ({
  icon = "iconsminds-bell",
  title = "title",
  detail = "detail",
  to = "",
  history,
}) => {
  return (
    <>
      <NavLink to={`${accountRoot}/${to}`}>
        <Card className="progress-banner">
          <CardBody className="justify-content-between d-flex flex-row align-items-center">
            <div>
              <i
                className={`${icon} mr-2 text-white align-text-bottom d-inline-block`}
              />
              <div>
                <p className="lead text-white">{title}</p>
                <p className="text-medium text-white">{detail}</p>
              </div>
            </div>
          </CardBody>
        </Card>
      </NavLink>
    </>
  );
};
export default React.memo(GradientCard);
