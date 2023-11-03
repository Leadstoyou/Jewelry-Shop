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
import { createContext, useCallback, useEffect, useRef, useState } from "react";
import WatchOrder from './pages/WatchOrder.jsx'
import { useDispatch, useSelector } from "react-redux";
import { login } from "./redux/Login.jsx";
import { getNumber } from "./redux/GetNumber.jsx";
import RiseLoader from "react-spinners/RiseLoader";
import { fetchDataAndDispatch } from "./services/genUser.js";
import axios from "axios";
import NewPass from "./pages/NewPassword.jsx"
const Container = styled.div``;
export const cartValue = createContext();
function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [txt, setTxt] = useState();
  const [cookieChangeTrigger, setCookieChangeTrigger] = useState(0);

  useEffect(()=>{
    setLoading(true)
  },[])
  useEffect(()=>{
    setTimeout(()=>{
      setLoading(false)
    },2000)
  },[])
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

  const initialRender = useRef(true);
  const changeInitial = () => {
    initialRender.current = true;
  };

  console.log(initialRender.current);
  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;

      console.log("cartData:", cartData);

      const fetchData = async () => {
        await viewCartAPI("hi", setViewCart);

        number = 1;
      };

      console.log("Before fetchData");
      fetchData();
      console.log("After fetchData");
    }
  }, [initialRender.current]);
  // document.cookie = `cart_token=${cartView?.cart_token}`;
  console.log("cart view");
  console.log(cartView);
  useEffect(() => {
    console.log(cartView?.productList.length);
    dispatch(getNumber(cartView?.productList.length));
  }, [cartView]);
  // useEffect(()=>{
  //   setTimeout(()=>{
  //     setLoading(false)
  //   },2000)
  // },[])
  return (
      <>
      {loading ? (
        <Container
          style={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <RiseLoader color={"#575855"} size={30} loading={loading} />
        </Container>
      ) : (
    <Container>
      <cartValue.Provider
        value={{
          changeInitial,
          initialRender,
          cartView,
          setViewCart,
          cartData,
          setCartData,
          setShowCartPopup,
          number,
          showCartPopup,
          txt,setTxt
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
            <Route path="/newpass" element={<NewPass />} />
            <Route path="/order" element={<WatchOrder />} />
          </Routes>
        </BrowserRouter>
      </cartValue.Provider>
    </Container>
  )};
  </>
  );
}

export default App;
