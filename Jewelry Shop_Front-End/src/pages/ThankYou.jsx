import { useEffect,useState } from "react";
import { makeAnNewOrder } from "../services/connectApi";
import styled from "styled-components";
import RiseLoader from "react-spinners/RiseLoader";
import FavoriteIcon from '@mui/icons-material/Favorite';
import Navbar from "../components/Navbar"
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

const ThankYou = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetch(){
      await makeAnNewOrder();
    }
    fetch();
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
        <Navbar/>
          <Inside>
            <h1 style={{ fontSize: "120px" ,fontWeight:'bolder'}}>
              <FavoriteIcon style={{ fontSize: "150px",fontWeight:"1000", marginRight: "15px",color:'red' }} />
              THANK YOU FOR YOUR PURCHASE
            </h1>
          </Inside>
        
        </Container>
      )}
    </>
  );
};

export default ThankYou;
