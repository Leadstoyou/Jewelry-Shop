import styled from "styled-components";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import RiseLoader from "react-spinners/RiseLoader";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logins from "../components/Logins";
import { useDispatch } from "react-redux";
import { fetchDataAndDispatch } from "../services/genUser";
// const Container = styled.div``;
const Spinner = styled.div`
  height: 100%;
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Container = styled.div``;

function Login() {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const cookies = document.cookie; 
  const cookieArray = cookies.split(";"); 

  let accessToken;

  for (let i = 0; i < cookieArray.length; i++) {
    const cookie = cookieArray[i].trim(); 
    if (cookie.startsWith("accessToken=")) {
      accessToken = cookie.substring("accessToken=".length); 
      break; 
    }
  }

  if(accessToken){
    navigate('/')
  }
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 200);
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
          <Logins />
        </Container>
      )}
    </>
  );
}

export default Login;
