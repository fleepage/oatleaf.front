import {
  CLEARMESSAGE,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  LOGOUT,
} from "../constants/defaultValues";

export const AuthReducer = (state, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuth: true,
        isError: false,
        message: "",
        data: action.payload.data,
      };
    case LOGOUT:
      return {
        ...state,
        isAuth: false,
        isError: false,
        data: {},
        message: action.payload.message,
      };
    case CLEARMESSAGE:
      return {
        ...state,
        message: action.payload.message,
      };
    case LOGIN_FAILED:
      //console.log("yes");
      return {
        ...state,
        isAuth: false,
        isError: true,
        message: "",
        data: action.payload,
      };
    default:
      return state;
  }
};
