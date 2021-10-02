import {
  FETCH_ORDER_INIT,
  FETCH_ORDER_SUCCESS,
  FETCH_ORDER_FAIL,
} from "../actionTypes";

const fetchOrderReducer = (state = {}, action) => {
  const { type, orders } = action;
  switch (type) {
    case FETCH_ORDER_INIT:
      return {
        ...state,
        type,
        ...orders,
      };
    case FETCH_ORDER_SUCCESS:
      return {
        ...state,
        type,
        ...orders,
      };
    case FETCH_ORDER_FAIL:
      return {
        ...state,
        type,
        ...orders,
      };
    default:
      return state;
  }
};
export default fetchOrderReducer;
