import styled from "styled-components";
import RiseLoader from "react-spinners/RiseLoader";
import { useEffect, useState } from "react";
import Navbar from "../Navbar.jsx";
import Footer from "../Footer.jsx";
import WarningIcon from "@mui/icons-material/Warning";
const Container = styled.div`
  font-family: "Jost", sans-serif;
`;

const Inside = styled.div`
  height: 500px;
  margin-top: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function NotFound() {
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
          <Navbar />
          <Inside>
            <h1 style={{ fontSize: "80px" ,fontWeight:'bolder'}}>
              <WarningIcon style={{ fontSize: "100px", marginRight: "15px",color:'red' }} />
              Not found page
            </h1>
          </Inside>
          <Footer />
        </Container>
      )}
    </>
  );
}

export default NotFound;
