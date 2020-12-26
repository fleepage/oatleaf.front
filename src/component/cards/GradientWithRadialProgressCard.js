import React from "react";
import { NavLink } from "react-router-dom";
import { Card, CardBody } from "reactstrap";
import { adminRoot } from "../../constants/defaultValues";

const GradientWithRadialProgressCard = ({
  icon = "iconsminds-bell",
  title = "title",
  detail = "detail",
  to = "",
}) => {
  return (
    <NavLink to={`${adminRoot}/${to}`}>
      <Card className="progress-banner">
        <CardBody className="justify-content-between d-flex flex-row align-items-center">
          <div>
            <i
              className={`${icon} mr-2 text-white align-text-bottom d-inline-block`}
            />
            <div>
              <p className="lead text-white">{title}</p>
              <p className="text-small text-white">{detail}</p>
            </div>
          </div>
        </CardBody>
      </Card>
    </NavLink>
  );
};
export default React.memo(GradientWithRadialProgressCard);
