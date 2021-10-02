/**
 * This component is combined All reducer in one root reducer with key value pair
 */
import { combineReducers } from "redux";
import { reducer as toastrReducer } from "react-redux-toastr";
//? own Reducer
import updateProduct from "./update-product";
import fetchUserProducts from "./fetch-user-products";
import logIn from "./login";
import signUp from "./sign_up";
//?shop
import fetchCartItems from "./fetch-cart-items";
import fetchOrderReducer from "./fetch-orders";
import cartItemsCount from "./cartItemsCount";

export default combineReducers({
   updateProduct,
   userProducts: fetchUserProducts,
   logIn,
   signUp,
   cartItems: fetchCartItems,
   orders: fetchOrderReducer,
   cartItemsCount,
   toastr: toastrReducer,
});
