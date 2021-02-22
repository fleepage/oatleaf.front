import moment from "moment";
import React from "react";

const DateFormatter = ({ value = 1 }) => {
  return <>{moment(value).calendar()}</>;
};

export default DateFormatter;
