import React from "react";
import { CountryDropdown } from "react-country-region-selector";
import "react-phone-input-2/lib/style.css";

const CountrySelector = ({ field, form, selectCountry, value, ...props }) => {
  return (
    <CountryDropdown
      value={value}
      valueType={"short"}
      className="form-control"
      onChange={(val) => {
        selectCountry(val);
        form.setFieldValue("country", val);
      }}
    />
  );
};

export default CountrySelector;
