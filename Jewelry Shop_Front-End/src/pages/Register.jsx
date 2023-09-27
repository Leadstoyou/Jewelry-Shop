import styled from "styled-components";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import RiseLoader from "react-spinners/RiseLoader";
import { useEffect, useState } from "react";
import Registers from "../components/Registers";


// const Container = styled.div``;
const Spinner = styled.div`
  height: 100%;
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
`
const Container = styled.div``;

function Register() {
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
          <Registers />
         <Footer/>
          </Container>
      )}
   </>
  );
}

export default Register;
