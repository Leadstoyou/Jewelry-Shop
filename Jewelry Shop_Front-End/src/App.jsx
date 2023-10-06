import './App.css';
// import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import styled from 'styled-components'
import SearchPage from './pages/SearchPage';
import 'bootstrap/dist/css/bootstrap.min.css'
import Collections from './pages/Collections';
import Products from './pages/Products';
import CartPage from './pages/Cart';
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
const Container = styled.div``

function App() {
  return <Container>
     <BrowserRouter basename="/Jewelry-Shop">
     <Routes > 
      <Route path="/" element={<Homepage />} />
      <Route path="/search/:searchtext" element={<SearchPage />} />
      <Route path="/collections" element={<Collections />} />
      <Route path="/product/:id" element={<Products />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
     </Routes>
     </BrowserRouter>
  </Container>;
}

export default App;
