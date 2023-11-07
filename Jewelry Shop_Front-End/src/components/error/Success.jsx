import styled from "styled-components";
import RiseLoader from "react-spinners/RiseLoader";
import { useEffect, useState } from "react";
import Navbar from "../Navbar.jsx";
import Footer from "../Footer.jsx";
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

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

  
function Success() {
  const {id} = useParams();
  const navigation =useNavigate();
const connectApi = async () => {
  try {
    const response = await axios.get(
      `http://localhost:9999/api/v1/account/verify/${id}`
    );
  }
  catch (error) {
    console.log(error);
  }};
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    connectApi();
    navigation("/login")
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
            <h1 style={{ fontSize: "100px" ,fontWeight:'bolder'}}>
              <CheckRoundedIcon style={{ fontSize: "150px",fontWeight:"1000", marginRight: "15px",color:'green' }} />
             SUCCESSFULLY
            </h1>
          </Inside>
          <Footer />
        </Container>
      )}
    </>
  );
}

export default Success;