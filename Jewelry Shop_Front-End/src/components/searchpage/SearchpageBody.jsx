import styled from "styled-components";
import Product from "./Product";
import Pagination from "react-bootstrap/Pagination";
import PageItem from "react-bootstrap/PageItem";
import "bootstrap/dist/css/bootstrap.min.css";
import { Dropdown } from "bootstrap";
import axios from "axios";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Container = styled.div`
  margin-top: 100px;
  margin-bottom: 15vh;
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
const Underline = styled.hr``;
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
  margin-left: 40px;
  margin-right: 35px;
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
  padding: 5px;
`;
const TextInDropdown = styled.option``;
const TextSearch = styled.div``;

const SearchpageBody = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  const { searchtext } = useParams();
  const [foundProducts, setFoundProducts] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`http://localhost:9999/api/v1/products/search/${searchtext}`);
        const data = response.data.data;
        setFoundProducts(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, [searchtext])
  return (
    <Container data-aos="fade-up">
      <Header data-aos="fade-up">
        <Title>
          <TitleItem>Tìm kiếm</TitleItem>
        </Title>
        <Text>
          <TextItem>
            Có <Inline>... sản phẩm</Inline> cho tìm kiếm
          </TextItem>
        </Text>
      </Header>
      <TitleProduct data-aos="fade-up">
        <Result>
          Kết quả tìm kiếm cho <Inline>"....."</Inline>
        </Result>
      </TitleProduct>
      <SearchController data-aos="fade-up">
        <ItemOne>
          <TextSearch>Lọc sản phẩm</TextSearch>
          <DropdownOne>
            <TextInDropdown disabled selected>
              Màu sắc
            </TextInDropdown>
            <TextInDropdown></TextInDropdown>
            <TextInDropdown></TextInDropdown>
            <TextInDropdown></TextInDropdown>
          </DropdownOne>
          <DropdownOne>
            <TextInDropdown disabled selected>
              Chất liệu
            </TextInDropdown>
            <TextInDropdown></TextInDropdown>
            <TextInDropdown></TextInDropdown>
            <TextInDropdown></TextInDropdown>
          </DropdownOne>
          <DropdownOne>
            <TextInDropdown disabled selected>
              Giá
            </TextInDropdown>
            <TextInDropdown></TextInDropdown>
            <TextInDropdown></TextInDropdown>
            <TextInDropdown></TextInDropdown>
          </DropdownOne>
        </ItemOne>
        <ItemOne>
          <TextSearch>Sắp xếp sản phẩm</TextSearch>
          <DropdownOne>
            <TextInDropdown disabled selected>
              Mặc định
            </TextInDropdown>
            <TextInDropdown>Mới nhất</TextInDropdown>
            <TextInDropdown>Giá tăng dần</TextInDropdown>
            <TextInDropdown>Giá giảm dần</TextInDropdown>
          </DropdownOne>
        </ItemOne>
      </SearchController>
      <ProductList data-aos="fade-up">
        {foundProducts.map((product)=>
        <Product product={product}/>
        ) }
      </ProductList>
      <PagingController data-aos="fade-up">
        <Pagination>
          <Pagination.Prev linkStyle={{ color: "black" }} />
          <Pagination.Item
            linkStyle={{ color: "white", backgroundColor: "#3b3b3b" }}
            disabled
          >
            {1}
          </Pagination.Item>
          <Pagination.Item linkStyle={{ color: "black" }}>{2}</Pagination.Item>
          <Pagination.Item linkStyle={{ color: "black" }}>{3}</Pagination.Item>
          <Pagination.Item linkStyle={{ color: "black" }}>{4}</Pagination.Item>
          <Pagination.Item linkStyle={{ color: "black" }}>{5}</Pagination.Item>
          <Pagination.Item linkStyle={{ color: "black" }}>{6}</Pagination.Item>
          <Pagination.Item linkStyle={{ color: "black" }}>{7}</Pagination.Item>
          <Pagination.Next linkStyle={{ color: "black" }} />
        </Pagination>
      </PagingController>
    </Container>
  );
};

export default SearchpageBody;
