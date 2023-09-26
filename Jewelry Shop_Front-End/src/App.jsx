import './App.css';
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import styled from 'styled-components'

const Container = styled.div``

function App() {
  return <Container>
     <BrowserRouter>
     <Routes>

      <Route path="/" element={<Homepage />} />
     </Routes>
     </BrowserRouter>
  </Container>;
}

export default App;
