import styled from "styled-components";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import RiseLoader from "react-spinners/RiseLoader";
import CollectionsHeader from "../components/collections/CollectionsHeader";
import { useEffect, useState } from "react";
import CollectionsCategory from "../components/collections/CollectionsCategory";
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

          <CollectionsHeader />
          <CollectionsCategory />
          <Footer />
        </Container>
      )}
    </>
  );
};

export default Collections;
