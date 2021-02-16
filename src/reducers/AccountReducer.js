import {
  ACCOUNT_PERMISSION,
  ADD_ACCOUNT,
  ADD_CURRENT_SCHOOL,
  CLEAR_ACCOUNT,
  CLEAR_CURRENT_SCHOOL,
  SELECTED_ACCOUNT,
} from "../constants/defaultValues";

export const AccountReducer = (state, action) => {
  switch (action.type) {
    case ADD_ACCOUNT:
      return {
        ...state,
        data: action.payload.data,
      };
    case SELECTED_ACCOUNT:
      return {
        ...state,
        account: action.payload.accountIndex,
      };
    case ADD_CURRENT_SCHOOL:
      return {
        ...state,
        school: action.payload.school,
      };
    case CLEAR_CURRENT_SCHOOL:
      return {
        ...state,
        school: {},
      };
    case ACCOUNT_PERMISSION:
      return {
        ...state,
        permissions: action.payload.permission,
        token: action.payload.token,
      };
    case CLEAR_ACCOUNT:
      return {
        ...state,
        data: {},
        permissions: [],
        account: 0,
        token: "",
      };
    default:
      return state;
  }
};
