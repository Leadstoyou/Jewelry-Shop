import './App.css';
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import styled from 'styled-components'
import Register from './pages/Register';
import Login from './pages/Login';

const Container = styled.div``

function App() {
  return <Container>
     <BrowserRouter>
     <Routes>

      <Route path="/" element={<Homepage />} />
      <Route path="/register" element={<Register/>} />
      <Route path="/login" element={<Login/>} />
      

     </Routes>
     </BrowserRouter>
  </Container>;
}

export default App;
