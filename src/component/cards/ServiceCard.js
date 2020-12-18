import React from "react";
import { Card, CardBody } from "reactstrap";

const ServiceCard = ({ className = "mb-4", icon, title, value, btext }) => {
  return (
    <div className={`icon-row-item ${className} mb-5`}>
      <Card>
        <CardBody className="text-center">
          <div>
            <i className={icon + " large-icon"}></i>
            <h5 className="mb-3 font-weight-semibold">{title}</h5>
          </div>
          <div>
            <p className="detail-text">{value}</p>
          </div>
          <div>
            <a className="btn btn-outline-primary btn-sm ml-2" href="/accounts">
              {btext}
            </a>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default React.memo(ServiceCard);
