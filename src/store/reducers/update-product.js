import {
   UPDATE_PRODUCT_INIT,
   UPDATE_PRODUCT_SUCCESS,
   UPDATE_PRODUCT_FAIL,
   PRODUCT_TO_EDIT,
} from "../actionTypes";

const updateProductReducer = (state = {}, action) => {
   const { type, product, payload } = action;
   switch (type) {
      case UPDATE_PRODUCT_INIT:
         return {
            ...state,
            type,
            ...product,
         };
      case UPDATE_PRODUCT_SUCCESS:
         return {
            ...state,
            type,
            ...product,
         };
      case UPDATE_PRODUCT_FAIL:
         return {
            ...state,
            type,
            ...product,
         };
      case PRODUCT_TO_EDIT:
         return {
            ...state,
            type,
            productToEdit: {
               ...payload,
            },
         };
      default:
         return state;
   }
};

export default updateProductReducer;
