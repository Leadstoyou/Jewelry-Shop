import React, { useEffect } from "react";
import styled from "styled-components";
import { categoryElementEvent } from "../data";
import slide1 from "../assets/slide1.jpg";
import Aos from "aos";
import "aos/dist/aos.css";
const Container = styled.div`
  margin-top: 10vh;
`;
const Wrapper = styled.div``;
const Left = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 5vw;
`;
const Right = styled.div``;
const ImageController = styled.div`
  width: 40vw;
  height: 60vh;
`;
const Image = styled.img`
  width: 40vw;
  height: 60vh;
  object-fit: cover;
`;
const Title = styled.div`
  position: relative;
  display: inline; /* Set display to inline */

  &::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    border-bottom: 1px solid #cf8989; /* Adjust the thickness and color as needed */
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
const LeftItem = styled.div``;
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

const ElementOne = ({ item }) => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  return (
    <Container data-aos="fade-up">
      <Wrapper>
        <Left>
          {categoryElementEvent.map((item) => (
            <Controller key={item.id}>
              <ImageController>
                <Image src={slide1} />
              </ImageController>
              <LeftItem>
                <Title key={item.id}>{item.category_name}</Title>
              </LeftItem>
            </Controller>
          ))}
        </Left>
      </Wrapper>
    </Container>
  );
};

export default ElementOne;
