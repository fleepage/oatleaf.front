import React, { createContext, useEffect, useReducer, useState } from "react";
import { AccountReducer } from "../reducers/AccountReducer";

export const AccountContext = createContext();

const AccountContextProvider = (props) => {
  const [data, setData] = useState({});
  const [account, dispatch] = useReducer(AccountReducer, {}, () => {
    return data;
  });

  useEffect(() => {
    setData(account);
  }, [account]);

  return (
    <AccountContext.Provider value={{ account, dispatch }}>
      {props.children}
    </AccountContext.Provider>
  );
};

export default AccountContextProvider;
