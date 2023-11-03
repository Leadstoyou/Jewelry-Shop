import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import cart from "./redux/Cart.jsx";
import getNumber from "./redux/GetNumber.jsx";
import loginController from "./redux/Login.jsx";
const store = configureStore({
  reducer: {
    cart: cart,
    getNumber: getNumber,
    loginController : loginController
  },
});
ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  //  </React.StrictMode>
);
