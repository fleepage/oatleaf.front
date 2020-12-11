import { STORE_DETAILS, UPDATE_DETAILS } from "../constants/defaultValues";

export const BillReducer = (state, action) => {
  switch (action.type) {
    case STORE_DETAILS:
      return {
        ...state,
        isStateBill:action.payload.isStateBill,
        data: action.payload.data,
      };   
    case UPDATE_DETAILS:
        return {
          ...state,
          isStateBill:state.isStateBill,
          data: {...state.data,...action.payload.data},
        };      
    default:
      return state;
  }
};