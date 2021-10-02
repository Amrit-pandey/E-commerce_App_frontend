import React, { Component } from "react";
import Header from "./header";


/**
 * it adds a top Appbar(header) on the components which are wrapped with this hoc
 * @param {Component} InputComponent - component which is wrapped
 */
const Layout = InputComponent => {
  return class extends Component {
    render() {
      return (
        <>
          <Header />
          <InputComponent />
        </>
      );
    }
  };
};

export default Layout;
