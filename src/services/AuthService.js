import axios from "axios";

import { REGISTER_URL,ADMIN_LOGIN_URL } from "../constants/defaultValues";

export const LoginService = async (payload) => {
  try {
    var data = {
      "username":payload.email,
      "password":payload.password
    };
    let res = await axios.post(ADMIN_LOGIN_URL, data);
    console.log(res.status);
    return res;
  } catch (error) {
    //console.log(error.response.data);
    return error.response;
  }
};

export const RegisterService = async (payload) => {
  try {
    const data = {
      firstName: payload.firstName,
      lastName: payload.lastName,
      phone: payload.phone,
      email: payload.email,
      password: payload.password,
      passwordConfirmation: payload.passwordConfirmation
    };  
    let res = await axios.post(REGISTER_URL, data);
    return res;
  } catch (error) {
    return error.response;
  }
};
