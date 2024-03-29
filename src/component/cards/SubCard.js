import React from "react";
import { Card, CardBody } from "reactstrap";

const SubCard = ({ className = "mb-4", icon, title, value }) => {
  return (
    <div className={`icon-row-item ${className}`}>
      <Card>
        <CardBody className="text-center">
          <i className={icon} />
          <p className="card-text font-weight-semibold mb-0">{title}</p>
          <p className="lead text-center">{value}</p>
        </CardBody>
      </Card>
    </div>
  );
};

export default React.memo(SubCard);
