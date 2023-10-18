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
import { createContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNumber } from "./redux/GetNumber.jsx";
const Container = styled.div``;
export const cartValue = createContext();
function App() {
  var number = 1;
  const dispatch = useDispatch();
  const [cartView, setViewCart] = useState();
  const [cartData, setCartData] = useState();
  const [showCartPopup, setShowCartPopup] = useState(false);
  console.log(cartData);
 

  useEffect(() => {
    viewCartAPI("615a8f7f4e7c3a1d3a9b6e60", setViewCart);
    console.log("hasfas" + cartView);
    number = 1;
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

            <Route path="/search/:searchtext" element={<SearchPage />} />
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
