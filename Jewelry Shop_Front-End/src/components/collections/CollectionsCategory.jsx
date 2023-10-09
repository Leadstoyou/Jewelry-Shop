import styled from "styled-components";
import newest from '../../assets/new.jpg'
import love from '../../assets/love.jpg'
import Pagination from "react-bootstrap/Pagination";
import family from '../../assets/family.jpg'
import PageItem from 'react-bootstrap/PageItem'
import "bootstrap/dist/css/bootstrap.min.css";
import Product from "../collections/Product";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Container = styled.div`
   
`;
const Up = styled.div`
  background-color: #c1c1c1;
  height: 50px;
  width: 100%;
`;
const Text = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Bottom = styled.div`
 margin-top: 1%;
 margin-left: 6vw; 
  display: flex;
  align-items: center;
  justify-content: start;
  
`
const Item = styled.div`
  display: flex;
  flex-direction: column;
  
  margin-right: 20px;
`
const ImageController = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
const Image = styled.img`
  cursor: pointer;
  border-radius: 50%;
  height: 100px;
  width: 100%;
`
const TextController = styled.div`
  
`
const TextNew = styled.p`
  cursor: pointer;
  text-align: center;
`        
const SearchController = styled.div`
  
  /* margin-top:2%; */
  margin-bottom:2%;
  width: 95%;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  
`
const ItemOne = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`
const DropdownOne = styled.select`
  padding: 5px;
  border: none;
`
const TextInDropdown = styled.option`
`
const TextSearch = styled.div``

const Controller = styled.div`
  display: grid;
  grid-template-columns: 24.125% 24.125% 24.125% 24.125%;
  gap: 1%;
`
const PagingController = styled.div`
  margin-top: 10%;
  margin-bottom: 3%;
  display: flex;
  align-items: center;
  justify-content: center;
  
`;
const CollectionsCategory = (props) => {
  const {products} = props
  const navigate = useNavigate()
  const [foundProducts,setFoundProducts] = useState();
  useEffect(() => {
    setFoundProducts(products)
    Aos.init({ duration: 2000 });
  }, []);
  return (
    <Container>
        
      <Up data-aos="fade-up">
        <Text>
          <p
            style={{
              fontWeight: "bolder",
              marginTop: "auto",
              marginBottom: "auto",
            }}
          >
            Xem ngay các dòng sản phẩm đang hot
          </p>
        </Text>
      </Up>
      <Bottom data-aos="fade-up">
        <Item onClick={()=>navigate('/collections')}>
            <ImageController><Image src={newest}/></ImageController>
            <TextController><TextNew>Hàng mới về</TextNew></TextController>
        </Item>
      </Bottom>
      <hr data-aos="fade-up"/>
      <SearchController  data-aos="fade-up">
        <ItemOne>
          <DropdownOne>
            <TextInDropdown disabled selected>Màu sắc</TextInDropdown>
            <TextInDropdown></TextInDropdown>
            <TextInDropdown></TextInDropdown>
            <TextInDropdown></TextInDropdown>
          </DropdownOne>
          <DropdownOne>
            <TextInDropdown disabled selected>Chất liệu</TextInDropdown>
            <TextInDropdown></TextInDropdown>
            <TextInDropdown></TextInDropdown>
            <TextInDropdown></TextInDropdown>
          </DropdownOne>
          <DropdownOne>
            <TextInDropdown disabled selected>Giá</TextInDropdown>
            <TextInDropdown></TextInDropdown>
            <TextInDropdown></TextInDropdown>
            <TextInDropdown></TextInDropdown>
          </DropdownOne>
        </ItemOne>
        <ItemOne>
          <TextSearch>Sắp xếp&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|</TextSearch>
          <DropdownOne>
            <TextInDropdown disabled selected>Mặc định</TextInDropdown>
            <TextInDropdown>Mới nhất</TextInDropdown>
            <TextInDropdown>Giá tăng dần</TextInDropdown>
            <TextInDropdown>Giá giảm dần</TextInDropdown>
          </DropdownOne>
          </ItemOne>
      </SearchController>
      <Controller data-aos="fade-up">
      {foundProducts?.map((product, index) => (
    <Product product={product} key={index} />
))}

      </Controller>
      <PagingController data-aos="fade-up" >
        <Pagination>
          <Pagination.Prev linkStyle={{color : "black" }}/>
          <Pagination.Item  linkStyle={{color : "white" ,backgroundColor:'#3b3b3b' }} disabled>{1}</Pagination.Item>
          <Pagination.Item  linkStyle={{color : "black"}}>{2}</Pagination.Item>
          <Pagination.Item  linkStyle={{color : "black"}}>{3}</Pagination.Item>
          <Pagination.Item  linkStyle={{color : "black"}}>{4}</Pagination.Item>
          <Pagination.Item  linkStyle={{color : "black"}}>{5}</Pagination.Item>
          <Pagination.Item  linkStyle={{color : "black"}}>{6}</Pagination.Item>
          <Pagination.Item  linkStyle={{color : "black"}}>{7}</Pagination.Item>
          <Pagination.Next linkStyle={{color : "black"}}/>
        </Pagination>
      </PagingController>
    </Container>
  );
};

export default CollectionsCategory;
