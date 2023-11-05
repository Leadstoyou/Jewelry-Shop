import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styled from 'styled-components'
import ShoppingCart from "../components/shoppingCart/Cart";
import RiseLoader from "react-spinners/RiseLoader";
const Container = styled.div``
const CartPage = () => {
  const [loading, setLoading] = useState(false);
  const [spin,setSpin] =useState(false)
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
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
    <div>
      <Navbar className="fixed-navbar" />
      <div style={{ marginBottom: "5%" }}>
        <ShoppingCart  spin={spin} setSpin={setSpin}/>
      </div>
      <Footer />
    </div>
     )}
     </>
  );
};

export default CartPage;
