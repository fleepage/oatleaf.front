import React from "react";
import { Badge } from "reactstrap";

const Badger = ({
  success = true,
  title = "true",
  falseColor = "danger",
  trueColor = "success",
}) => {
  return (
    <Badge color={success ? trueColor : falseColor} pill className="mb-1">
      {title}
    </Badge>
  );
};

export default Badger;
