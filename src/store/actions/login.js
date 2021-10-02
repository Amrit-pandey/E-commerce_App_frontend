import { LOGIN_INIT, LOGIN_SUCCESS, LOGIN_FAIL } from "../actionTypes";
import axios from "../../utility/axios";
//import from lodash
import _get from "lodash/get";

export const loginUser = (reqBody, cbFunc) => {
   return async (dispatch) => {
      let logInRes = {
         data: {},
         isLoading: true,
         success: null,
         error: false,
      };
      dispatch({
         type: LOGIN_INIT,
         logInRes: { ...logInRes },
      });
      cbFunc({...logInRes})
      try {
         const response = await axios.post("/admin/login", reqBody);
         const data = _get(response, "data", {});
         let success = _get(response, "status", "") === 200 ? true : false;
         {/* setdata in the localStorage which are userId and userType    */}
         localStorage.setItem("userId", data?.userId ?? "");
         localStorage.setItem("userType", data?.userType ?? "");
         logInRes = {
            data,
            isLoading: false,
            success,
            error: false,
         };
         dispatch({
            type: LOGIN_SUCCESS,
            logInRes: { ...logInRes },
         });
         cbFunc({...logInRes});
      } catch (err) {
         const error = _get(err, "response.data.message", "some error occurred!");
         logInRes = {
            data: {},
            isLoading: false,
            success: false,
            error,
         };
         dispatch({
            type: LOGIN_FAIL,
            logInRes: { ...logInRes },
         });
         cbFunc({...logInRes})
      }
   };
};
