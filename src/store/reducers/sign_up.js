import { SIGN_UP_INIT, SIGN_UP_SUCCESS, SIGN_UP_FAIL } from "../actionTypes";

const signUpReducer = (state = {}, action) => {
   const { type, signUpRes } = action;
   switch (type) {
      case SIGN_UP_INIT:
         return {
            ...state,
            type,
            ...signUpRes,
         };
      case SIGN_UP_SUCCESS:
         return {
            ...state,
            type,
            ...signUpRes,
         };
      case SIGN_UP_FAIL:
         return {
            ...state,
            type,
            ...signUpRes,
         };
      default:
         return state;
   }
};
export default signUpReducer;
