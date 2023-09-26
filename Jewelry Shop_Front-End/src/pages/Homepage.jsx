import styled from "styled-components";
import Navbar from "../components/Navbar";
import Categories from "../components/Categories";
import Slider from "../components/Slider";
import ElementOne from "../components/ElementOne";
import ListProduct from "../components/ListProduct";
import Album from "../components/Album";
import Footer from "../components/Footer";
import RiseLoader from "react-spinners/RiseLoader";
import { useEffect, useState } from "react";

// const Container = styled.div``;
const Spinner = styled.div`
  height: 100%;
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
`
const Container = styled.div``;

function Homepage() {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);
  return (
    <>
      {loading ? (
        <Container  style={{ height: '100vh',display: 'flex', flexDirection: 'column',alignItems: 'center',justifyContent: 'center'}}>
          <RiseLoader color={"#575855"} size={30} loading={loading} />
        </Container>
      ) : (
        <Container>
          <Navbar />
          <Categories />
          <Slider />
          <ElementOne />
          <ListProduct />
          <Album />
          <Footer />
          </Container>
      )}
   </>
  );
}

export default Homepage;
