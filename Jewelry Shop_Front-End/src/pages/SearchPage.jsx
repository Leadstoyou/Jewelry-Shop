import styled from "styled-components";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import RiseLoader from "react-spinners/RiseLoader";
import "aos/dist/aos.css";
import SearchpageBody from "../components/searchpage/SearchpageBody";
import { useEffect, useState } from "react";
import Pagination from "react-bootstrap/Pagination";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { CollectionAPISearch } from "../api/productAPI";
import { CollectionFilterSearch } from "../api/productAPI";
const Container = styled.div`
  font-family: "Jost", sans-serif;
`;
const PageControl = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;
function SearchPage() {
  const [loading, setLoading] = useState(false);
  const { searchName } = useParams();
  const [foundProducts, setFoundProducts] = useState([]);
  const [colorsArray, setColorsArray] = useState([]);
  const [materialArray, setMaterialArray] = useState([]);
  const navigate = useNavigate();

  const [color, setColor] = useState(null);
  const [material, setMaterial] = useState(null);
  const [price, setPrice] = useState(
    JSON.stringify({
      minPrice: 0,
      maxPrice: 100000000,
    })
  );
  const [sort, setSort] = useState(JSON.stringify({}));
  const [activePage, setActivePage] = useState(1);
  const limitP = 1;
  const [totalPage, setTotalpage] = useState(0);
  const [totalSize, setTotalSize] = useState(0);
  const [filterPro, setFilterProduct] = useState();

  useEffect(() => {
    CollectionFilterSearch(
      setFilterProduct,
      searchName,
      color,
      material,
      price,
      sort
    );
  }, [searchName]);

  useEffect(() => {
    // This effect runs when filterPro changes
    const fetchData = async () => {
      console.log("array");
      console.log(colorsArray);
      console.log(materialArray);
      console.log(filterPro);
      if (filterPro) {
        const allColors = await filterPro.flatMap(
          (product) => product.productColors
        );
        const allMaterial = await filterPro.flatMap(
          (product) => product.productMaterials
        );
        const uniqueColors = await [...new Set(allColors)];
        console.log(uniqueColors);
        console.log(allMaterial);
        setColorsArray(allColors);
        setMaterialArray(allMaterial);
      } else {
        console.log("filterPro is undefined or empty.");
      }
    };
    fetchData();
  }, [filterPro]);

  useEffect(() => {
    CollectionAPISearch(
      limitP,
      setTotalpage,
      setTotalSize,
      activePage,
      searchName,
      color,
      material,
      price,
      sort,
      setFoundProducts,
      setLoading,
      toast,
      navigate
    );
  }, [activePage, filterPro, searchName, sort, material, color, price, sort]);

  const Allpage = [];
  for (let i = 1; i <= totalPage; i++) {
    Allpage.push(i);
  }
  console.log(Allpage);
  const handlePrev = () => {
    if (activePage > 1) {
      setActivePage(activePage - 1);
    }
  };
  const handleNext = () => {
    if (activePage < totalPage) {
      setActivePage(activePage + 1);
    }
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
            color={color}
            material={material}
            price={price}
            sort={sort}
            filterPro={filterPro}
            setColor={setColor}
            setMaterial={setMaterial}
            setPrice={setPrice}
            setSort={setSort}
            total={totalSize}
            products={foundProducts}
            productLength={foundProducts?.length}
            colorsArray={colorsArray}
            materialArray={materialArray}
            searchName={searchName}
          />
          {foundProducts?.length > 0 && (
            <PageControl>
              <Pagination>
                <Pagination.Prev onClick={handlePrev} />
                {Allpage.map((page) => (
                  <Pagination.Item
                    active={page === activePage}
                    onClick={() => {
                      setActivePage(page);
                    }}
                  >
                    {page}
                  </Pagination.Item>
                ))}
                <Pagination.Next onClick={handleNext} />
              </Pagination>
            </PageControl>
          )}
          <Footer />
        </Container>
      )}
    </>
  );
}

export default SearchPage;
