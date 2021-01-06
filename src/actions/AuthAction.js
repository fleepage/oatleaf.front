import {
  CLEARMESSAGE,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  LOGOUT,
} from "../constants/defaultValues";

export const AuthActionSuccess = (payload) => {
  return {
    type: LOGIN_SUCCESS,
    payload: payload,
  };
};

export const AuthActionFailed = (payload) => {
  return {
    type: LOGIN_FAILED,
    payload: payload,
  };
};

export const LogoutAction = (payload) => {
  return {
    type: LOGOUT,
    payload: payload,
  };
};

export const ClearMessageAction = (payload) => {
  return {
    type: CLEARMESSAGE,
    payload: payload,
  };
};
