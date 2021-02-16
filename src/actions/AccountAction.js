import {
  ACCOUNT_PERMISSION,
  ADD_ACCOUNT,
  ADD_CURRENT_SCHOOL,
  CLEAR_ACCOUNT,
  CLEAR_CURRENT_SCHOOL,
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

export const AddCurrentSchool = (payload) => {
  return {
    type: ADD_CURRENT_SCHOOL,
    payload: payload,
  };
};

export const ClearCurrentSchool = () => {
  return {
    type: CLEAR_CURRENT_SCHOOL,
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
