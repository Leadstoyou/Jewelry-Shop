import styled from "styled-components";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import RiseLoader from "react-spinners/RiseLoader";
import CollectionsHeader from "../components/collections/CollectionsHeader";
import { useEffect, useState } from "react";
import CollectionsCategory from "../components/collections/CollectionsCategory";
import { useParams } from "react-router-dom";
import axios from "axios";
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
  const [foundProducts, setFoundProducts] = useState();
  const [colorsArray, setColorsArray] = useState();
  const [materialArray, setMaterialArray] = useState();

  const [loading, setLoading] = useState(false);
  async function fetchData(color, material,price,sort) {
    try {
      const categories = ["Dây Chuyền", "Vòng", "Hoa Tai", "Charm", "Nhẫn"];
      const response = await axios.post(
        "http://localhost:9999/api/v1/products/view",
        { category: category, color: color, material: material,minPrice:price?.minPrice, maxPrice:price?.maxPrice,sort:sort},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = response.data?.data.products;
      console.log("data",data)
      if (!color && !material && !price && !sort) {
        const extractUnique = (property) => [
          ...new Set(data.flatMap((value) => value[property])),
        ];
        setMaterialArray(extractUnique("productMaterials"));
        setColorsArray(extractUnique("productColors"));
      }
      setFoundProducts(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data:", error);
    }
  }
  useEffect(() => {
    setLoading(true);
    fetchData();
  }, []);
  const handleDataFromChild = (color, material,price,sort) => {
    fetchData(color, material,price,sort);
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
