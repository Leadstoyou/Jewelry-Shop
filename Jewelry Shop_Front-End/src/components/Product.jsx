import styled from "styled-components";
import imgP from "../assets/product.jpg";
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import { useState } from "react";

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 2px;
`;

const ImageController = styled.div`
  width: 100%;
  height: 30vh;
`;

const Image = styled.img`
  height: 30vh;
  width: 16.3vw;
`;

const TextController = styled.div`
  text-align: center;
`;

const Title = styled.p``;

const Price = styled.p``;

const RootElement = styled.div`
  position: relative;
`;

const BackgroundElement = styled.div`
  /* position: relative; */
`;

const FatherController = styled.div`
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  justify-content: center;
  opacity: 0; /* Initially hide the content */
  transition: opacity 0.3s ease-in-out; /* Add a smooth transition effect */
  background-color: rgba(130, 129, 129, 0.5); /* Gray background color */
`;

const Icon = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  opacity: 0; 
  transition: opacity 0.3s ease-in-out;
  &:hover{
    color: red;
  }
  cursor: pointer;
`;

const TextTitle = styled.div`
  border: 1px solid black;
  background-color: black;
  color: white;
  padding: 10px;
  font-weight: 200;
  text-align: center;
  &:hover{
    background-color: #3f3f3f;
  }
`;

const Front = styled.div`
  ${Container}:hover & {
    ${FatherController}, ${Icon} {
      opacity: 1; 
    }
  }
`;

const Product = ({ props }) => {
  return (
    <Container>
      <RootElement>
        <BackgroundElement>
          <ImageController>
            <Image src={imgP} />
          </ImageController>
          <TextController>
            <Title>{props.product_name}</Title>
            <Price>{props.price}đ</Price>
          </TextController>
        </BackgroundElement>
        <Front>
          <FatherController>
            <TextTitle>Mua ngay</TextTitle>
          </FatherController>
          <Icon>
            <FavoriteOutlinedIcon />
          </Icon>
        </Front>
      </RootElement>
    </Container>
  );
};

export default Product;
