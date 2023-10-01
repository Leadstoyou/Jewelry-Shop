import './App.css';
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import styled from 'styled-components'
import SearchPage from './pages/SearchPage';
import 'bootstrap/dist/css/bootstrap.min.css'
import Collections from './pages/Collections';
import Products from './pages/Products';
const Container = styled.div``

function App() {
  return <Container>
     <BrowserRouter>
     <Routes>

      <Route path="/" element={<Homepage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/collections" element={<Collections />} />
      <Route path="/products" element={<Products />} />
     </Routes>
     </BrowserRouter>
  </Container>;
}

export default App;
