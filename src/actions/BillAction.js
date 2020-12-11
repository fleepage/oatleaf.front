import { STORE_DETAILS,UPDATE_DETAILS } from "../constants/defaultValues";

export const BillActionStore = (payload) => {
  return {
    type: STORE_DETAILS,
    payload: payload,
  };
};

export const BillActionUpdate = (payload) => {
  return {
    type: UPDATE_DETAILS,
    payload: payload,
  };
};

