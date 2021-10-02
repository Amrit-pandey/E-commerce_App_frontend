import {
   FETCH_CART_ITEMS_INIT,
   FETCH_CART_ITEMS_SUCCESS,
   FETCH_CART_ITEMS_FAIL,
} from "../actionTypes";
//? utility
import axios from "../../utility/axios/";
//?lodash
import _get from "lodash/get";
import setCartItemsCount from "../../store/actions/set-cartitems-count";

export const fetchCartItems = () => {
   return async (dispatch) => {
      let cartItems = {
         data: [],
         isLoading: true,
         success: undefined,
         error: false,
      };
      dispatch({
         type: FETCH_CART_ITEMS_INIT,
         cartItems: { ...cartItems },
      });
      try {
         const response = await axios.get("/fetch-cart-items", {
            headers: {
               userid: localStorage.getItem("userId"),
            },
         });
         const data = _get(response, "data", []);
         let success = _get(response, "status", "") === 200 ? true : false;
         cartItems = {
            data,
            isLoading: false,
            success,
            error: false,
         };
         dispatch({
            type: FETCH_CART_ITEMS_SUCCESS,
            cartItems: { ...cartItems },
         });
         dispatch(setCartItemsCount(data?.length));
      } catch (err) {
         const error = _get(err, "response.data.message", "some error occurred!");
         cartItems = {
            data: [],
            isLoading: false,
            success: false,
            error,
         };
         dispatch({
            type: FETCH_CART_ITEMS_FAIL,
            cartItems: { ...cartItems },
         });
      }
   };
};
