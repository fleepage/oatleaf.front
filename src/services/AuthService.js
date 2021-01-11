import axios from "axios";
import {
  ADMIN_LOGIN_URL,
  BASE_URL,
  REGISTER_URL,
} from "../constants/defaultValues";

export const LoginService = async (payload) => {
  try {
    var config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
    var data = {
      authenticateDto: {
        username: payload.email,
        password: payload.password,
      },
    };
    let res = await axios.post(ADMIN_LOGIN_URL, data, config);
    return res;
  } catch (error) {
    return error.response;
  }
};

export const RegisterService = async (payload) => {
  try {
    var config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
    const data = {
      registerDto: {
        firstName: payload.firstname,
        lastName: payload.lastname,
        phone: payload.phone,
        email: payload.email,
        password: payload.password,
        passwordConfirmation: payload.passwordConfirmation,
      },
    };
    //console.log(data);
    let res = await axios.post(REGISTER_URL, data, config);
    return res;
  } catch (error) {
    return error.response;
  }
};

export const MyAccountsService = async (payload) => {
  try {
    var config = {
      headers: {
        Authorization: `Bearer ${payload.token}`,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
    var data = {};

    let res = await axios.post(`${BASE_URL}/Accounts/MyAccounts`, data, config);

    return res;
  } catch (error) {
    return error.response;
  }
};

export const SelectAccountService = async (payload) => {
  try {
    var config = {
      headers: {
        Authorization: `Bearer ${payload.token}`,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
    var data = {
      selectAccountDto: {
        account: payload.account,
      },
    };

    let res = await axios.post(`${BASE_URL}/Accounts/select`, data, config);

    return res;
  } catch (error) {
    return error.response;
  }
};
