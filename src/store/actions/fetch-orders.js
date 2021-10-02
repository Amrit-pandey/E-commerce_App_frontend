import { FETCH_ORDER_INIT, FETCH_ORDER_SUCCESS, FETCH_ORDER_FAIL } from "../actionTypes";
//? utility
import axios from "../../utility/axios/";
//?lodash
import _get from "lodash/get";

export const fetchOrder = () => {
   return async (dispatch) => {
      let orders = {
         data: [],
         isLoading: true,
         success: undefined,
         error: "",
      };
      dispatch({
         type: FETCH_ORDER_INIT,
         orders: { ...orders },
      });

      try {
         const response = await axios({
            method: "GET",
            url: "/orders",
            headers: {
               userid: localStorage.getItem("userId"),
            },
         });
         const data = _get(response, "data", []);
         let success = _get(response, "status", "") === 200 ? true : false;
         orders = {
            data,
            isLoading: false,
            success,
            error: "",
         };
         dispatch({
            type: FETCH_ORDER_SUCCESS,
            orders: { ...orders },
         });
      } catch (err) {
         console.log(err, "err");
         const error = _get(err, "response.data.message", "some error occurred!");
         orders = {
            data: [],
            isLoading: false,
            success: false,
            error,
         };
         dispatch({
            type: FETCH_ORDER_FAIL,
            orders: { ...orders },
         });
      }
   };
};
