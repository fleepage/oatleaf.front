import { LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT } from "../constants/defaultValues";

export const AuthReducer = (state, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuth: action.payload.status==200,
        isError: false,
        data: action.payload.data,
      };
    case LOGOUT:
      return {
        ...state,
        isAuth: false,
        isError: false,
        data: {},
      };
    case LOGIN_FAILED:
      //console.log("yes");
      return {
        ...state,
        isAuth: false,
        isError: true,
        data: action.payload,
      };
    default:
      return state;
  }
};
