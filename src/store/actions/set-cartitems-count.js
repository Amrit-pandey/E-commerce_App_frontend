import { SET_CART_ITEMS_COUNT } from "../actionTypes";

const setCartItemsCount = (count) => {
   return {
      type: SET_CART_ITEMS_COUNT,
      payload: count,
   };
};

export default setCartItemsCount;
