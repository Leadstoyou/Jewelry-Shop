import styled from "styled-components";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import RiseLoader from "react-spinners/RiseLoader";
import "aos/dist/aos.css";
import SearchpageBody from "../components/searchpage/SearchpageBody";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

// const Container = styled.div``;
// const Spinner = styled.div`
//   height: 100%;
//   flex-direction: column;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;
const Container = styled.div`
  font-family: "Jost", sans-serif;
`;

function SearchPage() {
  const [loading, setLoading] = useState(false);
  const { searchtext } = useParams();
  const [foundProducts, setFoundProducts] = useState([]);

  useEffect(() => {
    setLoading(true);
    function getAccessTokenFromCookie() {
      const name = "accessToken=";
      const decodedCookie = decodeURIComponent(document.cookie);
      const cookieArray = decodedCookie.split(";");

      for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i].trim();
        if (cookie.indexOf(name) === 0) {
          console.log(cookie.substring(name.length, cookie.length));
          return cookie.substring(name.length, cookie.length);
        }
      }

      return null;
    }

    async function fetchData() {
      try {
        const accessToken = getAccessTokenFromCookie();
        console.log(accessToken);
        const response = await axios.get(
          `http://localhost:9999/api/v1/products/search/${searchtext}`,
          {
            headers: {
              Authorization: `Bearer ${getAccessTokenFromCookie()}`,
            },
          }
        );

        const data = response.data.data;
        setFoundProducts(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [searchtext]);
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
          <SearchpageBody
            searchtext={searchtext}
            foundProducts={foundProducts}
          />
          <Footer />
        </Container>
      )}
    </>
  );
}

export default SearchPage;
