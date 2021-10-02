import React, { Component } from "react";
import UserProducts from "./components/userProducts";
import ProductList from "./components/ProductList";
import Layout from "./Hoc/Layout";

/**
 * This is home(App) Component.Inside this component rendered different Page 
 * @param {ProductList and UserProduct} based on userType
 */
class App extends Component {
   render() {
      return (
         <div>{localStorage.getItem("userType") == 1 ? <ProductList /> : <UserProducts />}</div>
      );
   }
}

export default Layout(App);
