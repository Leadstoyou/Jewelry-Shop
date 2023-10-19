import styled from "styled-components";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import RiseLoader from "react-spinners/RiseLoader";
import CollectionsHeader from "../components/collections/CollectionsHeader";
import { useEffect, useState } from "react";
import CollectionsCategory from "../components/collections/CollectionsCategory";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CollectionAPI } from "../api/productAPI";
const Spinner = styled.div`
  height: 100%;
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Container = styled.div`
  font-family: "Jost", sans-serif;
`;
const Index = styled.div``;

const Collections = () => {
  const { category } = useParams();
  const [foundProducts, setFoundProducts] = useState([]);
  const [colorsArray, setColorsArray] = useState();
  const [materialArray, setMaterialArray] = useState();

  const [loading, setLoading] = useState(false);
const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    CollectionAPI(
      category,
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
    CollectionAPI(
      category,
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

          <CollectionsHeader category={category} products={foundProducts} />
          <CollectionsCategory
            products={foundProducts}
            colorsArray={colorsArray}
            materialArray={materialArray}
            fetchData={handleDataFromChild}
          />
          <Footer />
        </Container>
      )}
    </>
  );
};

export default Collections;
