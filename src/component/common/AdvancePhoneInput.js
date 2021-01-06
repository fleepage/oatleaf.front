import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const AdvancePhoneInput = ({ field, form, ...props }) => {
  return (
    <PhoneInput
      country={"ng"}
      enableSearch
      containerClass={"form-control"}
      containerStyle={{ zIndex: 4 }}
      inputStyle={{
        backgroundColor: "transparent",
        border: "none",
      }}
      buttonClass={"phone-style"}
      buttonStyle={{
        backgroundColor: "transparent",
        border: "none",
      }}
      //value={this.state.phone}
      onChange={(phone) => form.setFieldValue("phone", phone)}
    />
  );
};

export default AdvancePhoneInput;
