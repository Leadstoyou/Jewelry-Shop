import './App.css';
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import styled from 'styled-components'
<<<<<<< HEAD
<<<<<<< HEAD
import Register from './pages/Register';
import Login from './pages/Login';
import CartPage from './pages/Cart';
import Profile from './pages/Profile';

=======
import CartPage from './pages/Cart';
>>>>>>> main
=======
import CartPage from './pages/Cart';
>>>>>>> main


const Container = styled.div``
function App() {
  return <Container>
     <BrowserRouter>
     <Routes>
      <Route path="/" element={<Homepage />} />
<<<<<<< HEAD
<<<<<<< HEAD
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
=======
      <Route path="/cart" element={<CartPage />} />
>>>>>>> main
=======
      <Route path="/cart" element={<CartPage />} />
>>>>>>> main
     </Routes>
     </BrowserRouter>
  </Container>;
}




export default App;


