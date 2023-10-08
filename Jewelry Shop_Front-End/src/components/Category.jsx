import styled from "styled-components";
import img from "../assets/charm.jpg";
import { useNavigate } from "react-router-dom";
const Container = styled.div`
  border: 1px solid #d6d2d2;
  padding-bottom: 20px;
  text-align: center;
  cursor: pointer;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  &:hover {
    opacity: 0.8;
    
  }
`;
const ImageController = styled.div``;
const Image = styled.img``;
const TextController = styled.div``;
const Title = styled.div`
  display: inline-block;
  position: relative;
  
  &::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    border-bottom: 1px solid #cf8989;
  }
  
  &:hover{
    &::after {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      border-bottom: 1px solid red;
    }
  }
`;
const Category = ({ item }) => {
  const navigate = useNavigate()
  return (
    <Container onClick={()=> navigate('/collections')}>
      <ImageController>
        <Image src={img} />
      </ImageController>
      <TextController>
        <Title>{item.category_name}</Title>
      </TextController>
    </Container>
  );
};

export default Category;
