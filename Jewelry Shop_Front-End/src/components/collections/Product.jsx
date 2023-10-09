import styled from "styled-components";
import pImage from "../../assets/productInCollection.jpg";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";
const Container = styled.div`
  margin: 1px;
  width: 100%;
  height: 100%;
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

const ProductImageController = styled.div``;
const ImageProduct = styled.div``;
const Img = styled.img`
  width: 100%;
  transition: all 0.5s ease-in;
  ${Container}:hover & {
    transform: scale(1.4);
  }
`;

const Control = styled.div`
  width: 100%;
  background-color: #f4f4f4;
`;

const ProductTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Ptitle = styled.p``;
const Pprice = styled.p``;

const All = styled(Link)`
  z-index: 1;
  cursor: pointer;
`;

const Product = ({ product }) => {
  return (
<Link to={`/product/${product._id}`}>
      <Container data-aos="fade-up">
        <Overlay></Overlay>
        <Button>Mua ngay</Button>
        <All>
          <ProductImageController>
            <ImageProduct style={{ overflow: "hidden" }}>
              <Img src={product?.productImage} />
            </ImageProduct>
          </ProductImageController>
          <Control>
            <ProductTitle>
              <Ptitle>{product?.productName}</Ptitle>
              <Pprice>{product?.productPrice}₫</Pprice>
            </ProductTitle>
          </Control>
        </All>
      </Container>
    </Link>
  );
};

export default Product;
