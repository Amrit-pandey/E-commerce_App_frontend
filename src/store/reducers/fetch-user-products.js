import {
   FETCH_USER_PRODUCTS_INIT,
   FETCH_USER_PRODUCTS_FAIL,
   FETCH_USER_PRODUCTS_SUCCESS,
} from "../actionTypes";

const fetchProductsReducer = (state = {}, action) => {
   const { type, products } = action;
   switch (type) {
      case FETCH_USER_PRODUCTS_INIT:
         return {
            ...state,
            type,
            ...products,
         };
      case FETCH_USER_PRODUCTS_SUCCESS:
         return {
            ...state,
            type,
            ...products,
         };
      case FETCH_USER_PRODUCTS_FAIL:
         return {
            ...state,
            type,
            ...products,
         };
      default:
         return state;
   }
};
export default fetchProductsReducer;
