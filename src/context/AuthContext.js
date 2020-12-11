import React, { createContext, useReducer, useEffect } from "react";
import { AuthReducer } from "../reducers/AuthReducer";

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [auth, dispatch] = useReducer(AuthReducer, {}, () => {
    const data = localStorage.getItem("auth");
    try {
      return JSON.parse(data);
    } catch (e) {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem("auth", JSON.stringify(auth));
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, dispatch }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
