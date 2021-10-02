import {
  UPDATE_PRODUCT_INIT,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  PRODUCT_TO_EDIT,
} from "../actionTypes";
import axios from "../../utility/axios/";
import _get from "lodash/get";

export const updateProduct = (reqBody, cbfunc) => {
  console.log(reqBody, "req")
  return async (dispatch) => {
    let product = {
      data: {},
      isLoading: true,
      success: false,
      error: "",
    };
    dispatch({
      type: UPDATE_PRODUCT_INIT,
      product: { ...product },
    });
    cbfunc({ ...product });
    try {
      const response = await axios({
        method: "POST",
        url: "/admin/update-product",
        data: reqBody,
        headers: {
          userid: localStorage.getItem("userId"),
        },
      });
      const data = _get(response, "data", {});
      let success = _get(response, "status", "") === 200 ? true : false;
      product = {
        data,
        isLoading: false,
        success,
        error: "",
      };
      dispatch({
        type: UPDATE_PRODUCT_SUCCESS,
        product: { ...product },
      });
      cbfunc({ ...product });
    } catch (err) {
      const error = _get(err, "response.data.message", "some error occurred!");
      product = {
        data: {},
        isLoading: false,
        success: false,
        error,
      };
      dispatch({
        type: UPDATE_PRODUCT_FAIL,
        product: { ...product },
      });
      cbfunc({ ...product });
    }
  };
};

export const saveProductToEdit = (productDetail) => {
  return {
    type: PRODUCT_TO_EDIT,
    payload: {
      ...productDetail,
    },
  };
};
