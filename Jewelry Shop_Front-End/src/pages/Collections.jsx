import styled from "styled-components";
import Pagination from "react-bootstrap/Pagination";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import RiseLoader from "react-spinners/RiseLoader";
import CollectionsHeader from "../components/collections/CollectionsHeader";
import { useEffect, useState } from "react";
import CollectionsCategory from "../components/collections/CollectionsCategory";
import { useLocation, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CollectionAPI } from "../services/productAPI";
import { CollectionFilterCategory } from "../services/productAPI";
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
const PageControl = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;
const Collections = () => {
  const { category } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const maxPrice = searchParams.get("maxPrice");

  console.log("maxPrice: " + maxPrice);

  const [foundProducts, setFoundProducts] = useState([]);
  const [colorsArray, setColorsArray] = useState();
  const [materialArray, setMaterialArray] = useState();
  const [filterPro, setFilterProduct] = useState();
  const [color, setColor] = useState(null);
  const [material, setMaterial] = useState(null);
  const [price, setPrice] = useState(
    JSON.stringify({
      minPrice: 0,
      maxPrice: 100000000,
    })
  );
  const navigate = useNavigate();
  const [sort, setSort] = useState(JSON.stringify({}));
  const [loading, setLoading] = useState(true);
  const notify = (text) => {
    toast.error(text, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };
  const [totalProduct, setTotalProduct] = useState(0);
  const [activePage, setActivePage] = useState(1);
  const limitP = 12;
  const [totalPage, setTotalpage] = useState(0);
  const [totalSize, setTotalSize] = useState(0);
  useEffect(() => {
    setActivePage(1);
  }, [sort, color, material, price]);

  useEffect(() => {
    CollectionFilterCategory(
      setFilterProduct,
      category,
      color,
      material,
      price,
      sort
    );
  }, [category]);

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
    CollectionAPI(
      limitP,
      setTotalpage,
      setTotalSize,
      activePage,
      category,
      color,
      material,
      price,
      sort,
      setFoundProducts,
      setLoading,
      toast,
      navigate,
      maxPrice
    );
  }, [activePage, filterPro, sort, material, color, price, sort]);

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

  //loading
  useEffect(() => {
    const delay = 2000; 
    setTimeout(() => {
      setLoading(false)
    }, delay);
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

          <CollectionsHeader category={category} totalSize={totalSize} />
          <CollectionsCategory
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
            colorsArray={colorsArray}
            materialArray={materialArray}
            maxPrice={maxPrice}
          />
          {foundProducts?.length > 0 && (
            <PageControl>
              <Pagination>
                <Pagination.Prev onClick={handlePrev} />
                {Allpage.map((page) => (
                  <Pagination.Item
                    active={page === activePage}
                    onClick={() => setActivePage(page)}
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
};

export default Collections;
