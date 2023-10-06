import Aos from "aos";
import "aos/dist/aos.css";
import styled from "styled-components";
import { useEffect } from "react";
import { Link } from "react-router-dom";
const Container =  styled(Link)`
  cursor: pointer;
  overflow: hidden;
  display: block; /* Ensures the anchor tag behaves as a block element */
  text-decoration: none; /* Removes default underline for anchor tags */
  
  .ImageController {
    width: 100%;
    height: 100%;
    transition: transform 1s ease;
  }

  &:hover {
    .ImageController {
      transform: scale(1.3);
    }
  }
`;
const ImageController = styled.div``;
const Image = styled.img`
  width: 100%;
`;
const DescController = styled.div``;
const Text = styled.p``;
const Title = styled.p``;
const Price = styled.p``;

const Product = ({product}) => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  console.log(product);
  return (
    <Container data-aos="fade-up" to={`/product/${product._id}`}>
      <div style={{ overflow: "hidden" }}>
        <ImageController className="ImageController">
          <Image className="Image" src={product.productImage} />
        </ImageController>
      </div>
      <DescController>
        <Text>Jewelry</Text>
        <Title>{product.productName}</Title>
        <Price>
        {product.productPrice}
          <p style={{ textDecoration: "underline", display: "inline" }}>đ</p>
        </Price>
      </DescController>
    </Container>
  );
};

export default Product;
