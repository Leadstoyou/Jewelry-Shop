import React, { useEffect } from "react";
import styled from "styled-components";
import { categoryElementEvent } from "../data";
import slide1 from "../assets/slide1.jpg";
import Aos from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";
const Container = styled.div`
  margin-top: 10vh;
`;
const Wrapper = styled.div`
  margin-left: 30px;
  margin-right: 30px;
  display: grid;
  grid-template-columns: 70% 30%;
`;
const Left = styled.div`
 
  margin-left : 20px;
  margin-right: 20px;
  display: grid;
  grid-template-columns: 30% 30% 30%;
  gap: 3vw;
  align-items: center;
  justify-content: space-between;
`;
const Right = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction:  column;
  gap: 30px;
`;
const ImageController = styled.div`
  width: 100%;
  height: 30vh;
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const Title = styled.div`
  z-index: 100;
  position: relative;
  display: inline; /* Set display to inline */

  &::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    border-bottom: 1px solid #cf8989; 
  }
   &:hover {
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
const LeftItem = styled.div`
  margin-top: 20px;
  margin-bottom: 10px;
`;
const Controller = styled.div`
  border: 1px solid #d6d2d2;
  padding-bottom: 20px;
  text-align: center;
  cursor: pointer;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  box-sizing: border-box;
  &:hover {
    opacity: 0.8;
  }
`;

const TextRight = styled.h2`
  font-weight: bolder;
`;

const ButtonRight = styled.button`
  border: none;
  background-color: black;
  color: white;
  padding: 10px;
  &:hover{
    background-color: #3f3f3f;
  }
`;

const ElementOne = ({ item }) => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  const navigate = useNavigate()
  return (
    <Container data-aos="fade-up">
      <Wrapper>
        <Left>
          {categoryElementEvent.map((item) => (
            <Controller key={item.id} onClick={()=> navigate('/collections')}>
              <ImageController>
                <Image src={slide1} />
              </ImageController>
              <LeftItem>
                <Title key={item.id}>{item.category_name}</Title>
              </LeftItem>
            </Controller>
          ))}
        </Left>
        <Right>
          <TextRight>Hơn cả một món quà</TextRight>
          <ButtonRight onClick={()=> navigate('/collections')}>Xem ngay</ButtonRight>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default ElementOne;
