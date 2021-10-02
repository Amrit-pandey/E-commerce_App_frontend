import {
   FETCH_USER_PRODUCTS_INIT,
   FETCH_USER_PRODUCTS_SUCCESS,
   FETCH_USER_PRODUCTS_FAIL,
} from "../actionTypes";
import axios from "../../utility/axios";
import _get from "lodash/get";

export const fetchProducts = () => {
   return async (dispatch) => {
      let products = {
         data: [],
         isLoading: true,
         success: null,
         errorMsg: "",
      };
      dispatch({
         type: FETCH_USER_PRODUCTS_INIT,
         products: { ...products },
      });
      try {
         const response = await axios({
            method: "GET",
            url: "/products",
            headers: {
              userid: localStorage.getItem("userId"),
            },
         });
         console.log(response,"response")
         const data = _get(response, "data.message", []);
         let success = _get(response, "status", "") === 200 ? true : false;
         products = {
            data,
            success,
            isLoading: false,
            errorMsg: "",
         };
         dispatch({
            type: FETCH_USER_PRODUCTS_SUCCESS,
            products: {
               ...products,
            },
         });
      } catch (err) {
         const errorMsg = _get(err, "response.data.message", "Something went wrong!");
         products = {
            data: [],
            isLoading: false,
            success: false,
            errorMsg,
         };
         dispatch({
            type: FETCH_USER_PRODUCTS_FAIL,
            products: { ...products },
         });
      }
   };
};
