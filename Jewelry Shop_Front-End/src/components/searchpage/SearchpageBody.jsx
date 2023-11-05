import Aos from "aos";
import "aos/dist/aos.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useContext, useEffect, useState } from "react";
import Pagination from "react-bootstrap/Pagination";
import styled from "styled-components";
import Product from "./Product";
import { cartValue } from "../../App";
import { CircularProgress } from "@mui/material";
import { Box } from "@mui/material";
const Container = styled.div`
  margin-top: 100px;
`;
const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Title = styled.div``;
const TitleItem = styled.h1``;
const Text = styled.div`
  position: relative;
  &::after {
    position: absolute;
    left: 35%;
    right: 35%;
    bottom: -20%;
    content: "";
    border-bottom: 5px solid black;
  }
`;
const TextItem = styled.p`
  font-size: large;
  color: #a1a1a1;
`;
const Inline = styled.span`
  font-weight: bolder !important;
  color: #494848 !important;
`;
const TitleProduct = styled.div`
  margin-top: 4%;
  margin-left: 3%;
`;
const ProductList = styled.div`
  margin-top: 30px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: ${({ productLength }) => (productLength > 0 ? "0" : "10%")};
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  align-items: center;
  justify-content: center;
  grid-column-gap: 20px;
  grid-row-gap: 20px;
`;
const PagingController = styled.div`
  margin-top: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Result = styled.p``;
const SearchController = styled.div`
  margin-top: 2%;
  margin-bottom: 2%;
  width: 95%;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const ItemOne = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;
const DropdownOne = styled.select`
  outline: none;
  padding: 5px;
  border: 5px solid #c3bebe;
`;
const TextInDropdown = styled.option``;
const TextSearch = styled.div``;
const NotFound = styled.div`
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const SearchpageBody = (props) => {
  const {
    products,
    materialArray,
    colorsArray,
    color,
    material,
    price,
    sort,
    searchName,
    setColor,
    setMaterial,
    setPrice,
    setSort,
    filterPro,
  } = props;

  const { txt } = useContext(cartValue);
  const { spinSearch, setSpinsearch } = props;
  const [searchText, setSearchText] = useState(searchName);
  const [foundProducts, setFoundProducts] = useState();
  const [colorsArrayTemp, setColorsArrayTemp] = useState(colorsArray);
  const [materialArrayTemp, setMaterialArrayTemp] = useState(materialArray);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedMaterial, setSelectedMaterial] = useState("");
  const [selectedPrice, setSelectedPrice] = useState(
    JSON.stringify({
      minPrice: 0,
      maxPrice: 100000000,
    })
  );
  const [selectedSort, setSelectedSort] = useState(JSON.stringify({}));
  useEffect(() => {
    setFoundProducts(products);
    setColorsArrayTemp(colorsArray);
    setMaterialArrayTemp(materialArray);

    Aos.init({ duration: 2000 });
  }, [products]);

  const handleSelected = (color, material, price, sort) => {
    console.log(color, material, price, sort);

    setColor(color);
    setMaterial(material);
    setPrice(price);
    setSort(sort);
  };

  return (
    <Container data-aos="fade-up">
      <Header data-aos="fade-up">
        <Title>
          <TitleItem>Tìm kiếm</TitleItem>
        </Title>
        {spinSearch ? (
          <div>
            <span>
              <CircularProgress size={20} />
            </span>
          </div>
        ) : (
          <>
            <Text>
              <TextItem>
                {props.productLength > 0 ? (
                  <>
                    {" "}
                    Có <Inline>{props?.total} sản phẩm</Inline> cho tìm kiếm{" "}
                  </>
                ) : (
                  <>
                    {" "}
                    Có <Inline>0 sản phẩm</Inline> cho tìm kiếm{" "}
                  </>
                )}
              </TextItem>
            </Text>
          </>
        )}
      </Header>
      <TitleProduct data-aos="fade-up">
        <Result>
          Kết quả tìm kiếm cho <Inline>"{txt}"</Inline>
        </Result>
      </TitleProduct>

      <SearchController data-aos="fade-up">
        <ItemOne>
          <TextSearch>Lọc sản phẩm</TextSearch>
          <DropdownOne
            onChange={(e) =>
              handleSelected(e.target.value, material, price, sort)
            }
          >
            <TextInDropdown value="" selected>
              Màu sắc
            </TextInDropdown>
            {colorsArrayTemp?.map((color, index) => (
              <TextInDropdown
                key={index}
                style={{
                  backgroundColor: color,
                  width: "30px",
                  height: "30px",
                  cursor: "pointer",
                  margin: "5px",
                  border: selectedColor === color ? "2px solid black" : "none",
                }}
                value={color}
              >
                {color}
              </TextInDropdown>
            ))}
          </DropdownOne>
          <DropdownOne
            onChange={(e) => handleSelected(color, e.target.value, price, sort)}
          >
            <TextInDropdown selected value="">
              Chất Liệu
            </TextInDropdown>
            {materialArrayTemp?.map((material, index) => (
              <TextInDropdown
                key={index}
                style={{
                  width: "30px",
                  height: "30px",
                  cursor: "pointer",
                  margin: "5px",
                  border:
                    selectedMaterial === material ? "2px solid black" : "none",
                }}
                value={material}
              >
                {material}
              </TextInDropdown>
            ))}
          </DropdownOne>
          <DropdownOne
            onChange={(e) =>
              handleSelected(color, material, e.target.value, sort)
            }
          >
            <TextInDropdown
              selected
              value={JSON.stringify({
                minPrice: 0,
                maxPrice: 100000000,
              })}
            >
              Giá
            </TextInDropdown>
            <TextInDropdown
              value={JSON.stringify({
                minPrice: 0,
                maxPrice: 1000000,
              })}
            >
              0 -- 1.0000.000đ
            </TextInDropdown>
            <TextInDropdown
              value={JSON.stringify({
                minPrice: 1000001,
                maxPrice: 2000000,
              })}
            >
              1.000.001 -- 2.0000.000đ
            </TextInDropdown>
            <TextInDropdown
              value={JSON.stringify({
                minPrice: 2000001,
                maxPrice: 3000000,
              })}
            >
              2.000.001 -- 3.0000.000đ
            </TextInDropdown>
            <TextInDropdown
              value={JSON.stringify({
                minPrice: 3000001,
                maxPrice: 4000000,
              })}
            >
              3.000.001 -- 4.0000.000đ
            </TextInDropdown>
            <TextInDropdown
              value={JSON.stringify({
                minPrice: 4000001,
                maxPrice: 100000000000,
              })}
            >
              Trên 4.000.000 đ
            </TextInDropdown>
          </DropdownOne>
        </ItemOne>
        <ItemOne>
          <TextSearch>Sắp xếp&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|</TextSearch>
          <DropdownOne
            onChange={(e) =>
              handleSelected(color, material, price, e.target.value)
            }
          >
            <TextInDropdown selected value={JSON.stringify({})}>
              Mặc định
            </TextInDropdown>
            <TextInDropdown value={JSON.stringify({ updatedAt: 1 })}>
              Cũ nhất
            </TextInDropdown>
            <TextInDropdown value={JSON.stringify({ updatedAt: -1 })}>
              Mới nhất
            </TextInDropdown>
            <TextInDropdown value={JSON.stringify({ productPrice: 1 })}>
              Giá tăng dần
            </TextInDropdown>
            <TextInDropdown value={JSON.stringify({ productPrice: -1 })}>
              Giá giảm dần
            </TextInDropdown>
            <TextInDropdown value={JSON.stringify({ productName: 1 })}>
              Tên A-Z
            </TextInDropdown>
            <TextInDropdown value={JSON.stringify({ productName: -1 })}>
              Tên Z-A
            </TextInDropdown>
          </DropdownOne>
        </ItemOne>
      </SearchController>

      {spinSearch ? (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: "200px",
            marginBottom: "200px",
          }}
        >
          <span>
            <CircularProgress size={100} />
          </span>
        </div>
      ) : (
        <ProductList data-aos="fade-up" productLength={props.productLength}>
          {props.productLength > 0 ? (
            foundProducts?.map((product, index) => (
              <Product product={product} key={index} />
            ))
          ) : (
            <div style={{ position: "absolute", top: "25%", right: "25%" }}>
              <h1>Not found the product you have just filtered !!!</h1>
            </div>
          )}
        </ProductList>
      )}
    </Container>
  );
};

export default SearchpageBody;
