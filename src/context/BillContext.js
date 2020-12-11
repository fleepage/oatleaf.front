import React, { createContext, useReducer, useEffect } from "react";
import { BillReducer } from "../reducers/BillReducer";

export const BillContext = createContext();

const BillContextProvider = (props) => {
  const [bill, dispatch] = useReducer(BillReducer, {}, () => {
    const data = localStorage.getItem("bill");
    try {
      return JSON.parse(data);
    } catch (e) {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem("bill", JSON.stringify(bill));
  }, [bill]);

  return (
    <BillContext.Provider value={{ bill, dispatch }}>
      {props.children}
    </BillContext.Provider>
  );
};

export default BillContextProvider;
