import styled from "styled-components";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import RiseLoader from "react-spinners/RiseLoader";
import "aos/dist/aos.css";
import SearchpageBody from "../components/searchpage/SearchpageBody";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { CollectionAPISearch } from "../api/productAPI";
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
  const { searchName } = useParams();
  const [foundProducts, setFoundProducts] = useState([]);
  const [colorsArray, setColorsArray] = useState();
  const [materialArray, setMaterialArray] = useState();
  const navigate = useNavigate();
  
  // useEffect(() => {
  //   setLoading(true);
  //   async function fetchData() {
  //     try {
  //       const response = await axios.get(
  //         `http://localhost:9999/api/v1/products/search/${searchtext}`
  //       );
  //       const data = response.data.data;
  //       setFoundProducts(data);
  //       setLoading(false);
  //     } catch (error) {
  //       setLoading(false);
  //       console.error("Error fetching data:", error);
  //     }
  //   }

  //   fetchData();
  // }, [searchtext]);
  useEffect(() => {
    setLoading(true);
    CollectionAPISearch(
      searchName,
      null,
      null,
      null,
      null,
      setColorsArray,
      setMaterialArray,
      setFoundProducts,
      setLoading,toast,navigate
    );
  }, []);
  const handleDataFromChild = (color, material, price, sort) => {
    CollectionAPISearch(
      searchName,
      color,
      material,
      price,
      sort,
      setColorsArray,
      setMaterialArray,
      setFoundProducts,
      setLoading,toast,navigate
    );
  };
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
             products={foundProducts}
             colorsArray={colorsArray}
             materialArray={materialArray}
             fetchData={handleDataFromChild}
             searchName={searchName}
          />
          <Footer />
        </Container>
      )}
    </>
  );
}

export default SearchPage;
