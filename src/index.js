import React from "react";
import ReactDOM from "react-dom";
//?Libraries
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import rootReducer from "./store/reducers";
import ReduxToastr from "react-redux-toastr";
import "react-redux-toastr/lib/css/react-redux-toastr.min.css";
import "./index.css";

//? own Components
import App from "./App";
import AddProduct from "./components/AddProduct";
import UpdateProduct from "./components/UpdateProduct";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import CartItems from "./components/CartItems";
import Orders from "./components/orders";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
   key: "root",
   storage,
   blacklist: [],
   whitelist: ["logIn", "cartItemsCount"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(thunk)));
persistStore(store);

ReactDOM.render(
   <Provider store={store}>
      <div>
         <Router>
            <Switch>
               <Route exact path="/orders">
                  <Orders />
               </Route>
               <Route exact path="/add-product">
                  <AddProduct />
               </Route>
               <Route exact path="/update-product/:id">
                  <UpdateProduct />
               </Route>
               <Route exact path="/cart-item">
                  <CartItems />
               </Route>
               <Route exact path="/login">
                  <Login />
               </Route>
               <Route exact path="/signup">
                  <SignUp />
               </Route>
               <Route exact path="/">
                  <App />
               </Route>
            </Switch>
         </Router>
         <ReduxToastr
            timeOut={4000}
            newestOnTop={false}
            preventDuplicates
            position="bottom-right"
            getState={(state) => state.toastr}
            transitionIn="fadeIn"
            transitionOut="fadeOut"
            progressBar
            closeOnToastrClick
         />
      </div>
   </Provider>,
   document.getElementById("root")
);
