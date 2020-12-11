export const customStyles = {
  control: (provided, state) => ({
    ...provided,
    color: "#fff",
    backgroundColor: "transparent",
    padding: "3px",
    // none of react-select's styles are passed to <Control />
    //width: 200,
  }),
  option: (provided, state) => ({
    ...provided,
    color: "#000",
    textAlign: "left",
  }),
  placeholder: (provided, state) => ({
    ...provided,
    color: "#fff",
  }),
  singleValue: (provided, state) => ({
    ...provided,
    color: "#fff",
  }),
  input: (provided, state) => ({
    ...provided,
    color: "#fff",
  }),
};

export const DarkcustomStyles = {
  control: (provided, state) => ({
    ...provided,
    color: "primary",
    backgroundColor: "transparent",
    padding: "3px",
    // none of react-select's styles are passed to <Control />
    //width: 200,
  }),
  option: (provided, state) => ({
    ...provided,
    color: "primary",
    textAlign: "left",
    backgroundColor: "transparent",
  }),
  placeholder: (provided, state) => ({
    ...provided,
    color: "primary",
  }),
  singleValue: (provided, state) => ({
    ...provided,
    color: "primary",
  }),
  input: (provided, state) => ({
    ...provided,
    color: "primary",
  }),
  loadingIndicator: (provided, state) => ({
    ...provided,
    color: "primary",
  }),
};
