import "./App.css";
// import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import styled from "styled-components";
import SearchPage from "./pages/SearchPage";
import "bootstrap/dist/css/bootstrap.min.css";
import Collections from "./pages/Collections";
import Products from "./pages/Products";
import CartPage from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Forgot from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import NotFound from "./components/error/NotFound";
import HistoryPage from "./pages/History";
import ListDeleteProduct from "./components/dashboard/product/ListDeleteProduct";
import Checkouts from "./pages/Checkouts";
import { viewCartAPI } from "./api/connectApi.js";
import { createContext, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./redux/Login.jsx";
import { getNumber } from "./redux/GetNumber.jsx";
import { fetchDataAndDispatch } from "./services/genUser.js";
import axios from "axios";
const Container = styled.div``;
export const cartValue = createContext();
function App() {
  const dispatch = useDispatch();

  const [cookieChangeTrigger, setCookieChangeTrigger] = useState(0);

  const checkForCookieChanges = useCallback(() => {
    const currentCookies = document.cookie;
    if (currentCookies !== cookieChangeTrigger) {
      setCookieChangeTrigger(currentCookies);
    }
  }, [cookieChangeTrigger]);

  useEffect(() => {
    const interval = setInterval(checkForCookieChanges, 1000);

    return () => clearInterval(interval);
  }, [checkForCookieChanges]);

  useEffect(() => {
    fetchDataAndDispatch(dispatch);
  }, [cookieChangeTrigger]);

  var number = 1;

  const [cartView, setViewCart] = useState();
  const [cartData, setCartData] = useState();
  const [showCartPopup, setShowCartPopup] = useState(false);
  console.log(cartData);
  const user = useSelector((state) => state?.loginController);
  console.log(user);
  useEffect(() => {
    console.log(document.cookie);

    const cookies = document.cookie.split("; ");
    const cartTokenCookie = cookies.find((cookie) =>
      cookie.startsWith("cart_token=")
    );
    console.log(cartTokenCookie);

    const fetchData = async () => {
      if (cartTokenCookie) {
        const cartTokenValue = cartTokenCookie.split("=")[1];
        console.log(cartTokenValue);
        await viewCartAPI(cartTokenValue, setViewCart);
        console.log(cartView);
        number = 1;
      }
    };

    fetchData(); // Call the async function here
  }, [cartData]);

  useEffect(() => {
    console.log(cartView?.productList.length);
    dispatch(getNumber(cartView?.productList.length));
  }, [cartView]);

  return (
    <Container>
      <cartValue.Provider
        value={{
          cartView,
          setViewCart,
          cartData,
          setCartData,
          setShowCartPopup,
          number,
          showCartPopup,
        }}
      >
        <BrowserRouter basename="/Jewelry-Shop">
          <Routes>
            <Route path="/" element={<Homepage cartView={cartView} />} />

            <Route path="/search/:searchName" element={<SearchPage />} />
            <Route path="/collections/:category" element={<Collections />} />
            <Route path="/product/:id" element={<Products />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/checkouts" element={<Checkouts />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/listdelete" element={<ListDeleteProduct />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/forgot" element={<Forgot />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </cartValue.Provider>
    </Container>
  );
}

export default App;
