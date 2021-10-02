import { SIGN_UP_INIT, SIGN_UP_SUCCESS, SIGN_UP_FAIL } from "../actionTypes";
//lodash
import _get from "lodash/get";
import axios from "../../utility/axios";

export const userSignUp = (reqBody, cb) => {
   //? converting userType to Number
   reqBody = {
      ...reqBody,
      userType: Number(reqBody.userType),
   };
   return async (dispatch) => {
      let signUpRes = {
         data: {},
         isLoading: true,
         success: false,
         error: false,
      };
      dispatch({
         type: SIGN_UP_INIT,
         signUpRes,
      });
      cb(signUpRes);
      try {
         const response = await axios.post("/signup", reqBody);
         const data = _get(response, "data", {});
         let success = _get(response, "status", "") === 200 ? true : false;
         signUpRes = {
            data,
            isLoading: false,
            success,
            error: false,
         };
         dispatch({
            type: SIGN_UP_SUCCESS,
            signUpRes,
         });
         cb(signUpRes);
      } catch (err) {
         const error = _get(err, "response.data.message", "some error occurred!");
         signUpRes = {
            data: {},
            isLoading: false,
            success: false,
            error,
         };
         dispatch({
            type: SIGN_UP_FAIL,
            signUpRes,
         });
         cb(signUpRes);
      }
   };
};
