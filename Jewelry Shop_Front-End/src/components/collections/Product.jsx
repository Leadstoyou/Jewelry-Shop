import styled from "styled-components";
import pImage from "../../assets/productInCollection.jpg";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Container = styled.div`
  margin: 1px;
  width: 100%;
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 0;
`;

const Overlay = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: #d8d6d6;
  z-index: 2;
  opacity: 0;
  transition: opacity 0.3s ease;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  ${Container}:hover & {
    opacity: 0.4;
  }
`;

const Button = styled.button`
  z-index: 3;
  border: none;
  padding: 5px;
  padding-left: 5px;
  padding-right: 5px;
  background-color: black;
  text-transform: uppercase;
  color: white;
  position: absolute;
  bottom: 25%;
  opacity: 0;
  left: 50%;
  transform: translateX(-50%);

  ${Container}:hover & {
    opacity: 1;
  }
`;

const ProductImageController = styled.div`
  width: 100%;
  height: 350px;
`;
const ImageProduct = styled.div`
  width: 100%;
  height: 100%;
`;
const Img = styled.img`
  width: 100%;
  height: 100%;
  transition: all 0.5s ease-in;
  ${Container}:hover & {
    transform: scale(1.2);
  }
`;

const Control = styled.div`
  width: 100%;
  height: 150px;
  background-color: #f4f4f4;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

// const ProductTitle = styled.div`
//   text-align: center;
//   color: black;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
// `;

const ProductTitle = styled.p`
  width: 90%;
  color: black;
  height: 50px;
`;
const Pprice = styled.p`
  color: black;

`;

const All = styled(Link)`
  z-index: 1;
  width: 100%;
  cursor: pointer;
`;

const Product = ({ product }) => {
  return (
    <Link to={`/product/${product._id}`} style={{ textDecoration: "none" }}>
      <Container data-aos="fade-up">
        <Overlay></Overlay>
        <Button>Mua ngay</Button>
        <All style={{ textDecoration: "none" }}>
          <ProductImageController>
            <ImageProduct style={{ overflow: "hidden" }}>
              <Img src={product?.productImage} />
            </ImageProduct>
          </ProductImageController>
          <Control>
            <ProductTitle>
              {product?.productName.length > 40
                ? product?.productName.substring(0, 60) + "..."
                : product?.productName} </ProductTitle>
              <Pprice>{product?.productPrice?.toLocaleString("vi-VN")}₫</Pprice>
           
          </Control>
        </All>
      </Container>
    </Link>
  );
};

export default Product;
