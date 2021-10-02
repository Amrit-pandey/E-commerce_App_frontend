import { SET_CART_ITEMS_COUNT } from "../actionTypes";

const CartItemsCount = (state = {}, action) => {
   const { type, payload } = action;
   switch (type) {
      case SET_CART_ITEMS_COUNT:
         return {
            ...state,
            type,
            count: payload,
         };
      default:
         return state;
   }
};

export default CartItemsCount;
