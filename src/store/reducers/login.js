import { LOGIN_INIT, LOGIN_SUCCESS, LOGIN_FAIL } from "../actionTypes";

const loginReducer = (state = {}, action) => {
  const { type, logInRes } = action;
  switch (type) {
    case LOGIN_INIT:
      return {
        ...state,
        type,
        ...logInRes
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        type,
        ...logInRes
      };
    case LOGIN_FAIL:
      return {
        ...state,
        type,
        ...logInRes
      };
    default:
      return state;
  }
};

export default loginReducer;
