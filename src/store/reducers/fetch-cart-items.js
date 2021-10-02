import {
  FETCH_CART_ITEMS_INIT,
  FETCH_CART_ITEMS_SUCCESS,
  FETCH_CART_ITEMS_FAIL,
} from "../actionTypes";

const fetchCartItems = (state = {}, action) => {
  const { type, cartItems } = action;
  switch (type) {
    case FETCH_CART_ITEMS_INIT:
      return {
        ...state,
        type,
        ...cartItems,
      };
    case FETCH_CART_ITEMS_SUCCESS:
      return {
        ...state,
        type,
        ...cartItems,
      };
    case FETCH_CART_ITEMS_FAIL:
      return {
        ...state,
        type,
        ...cartItems,
      };

    default:
      return state;
  }
};

export default fetchCartItems;
