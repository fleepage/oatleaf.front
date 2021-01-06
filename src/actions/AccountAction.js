import {
  ACCOUNT_PERMISSION,
  ADD_ACCOUNT,
  CLEAR_ACCOUNT,
  SELECTED_ACCOUNT,
} from "../constants/defaultValues";

export const AddAccount = (payload) => {
  return {
    type: ADD_ACCOUNT,
    payload: payload,
  };
};

export const AddSelectedAccount = (payload) => {
  return {
    type: SELECTED_ACCOUNT,
    payload: payload,
  };
};

export const AddAccountPermission = (payload) => {
  return {
    type: ACCOUNT_PERMISSION,
    payload: payload,
  };
};

export const ClearAccount = () => {
  return {
    type: CLEAR_ACCOUNT,
  };
};
