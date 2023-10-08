import styled from "styled-components";
import { categoryElement } from "../data";
import Category from "./Category";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
const Container = styled.div`
  margin-left: 30px;
  margin-right: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
  margin-top: 100px;
`;
const LeftController = styled.div`
  flex-basis: 25%;
`
const Title = styled.h4`
  font-weight: bolder;
`
const RightController = styled.div`
  flex-basis: 75%;
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 5%;
`
const Categories = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  return (
    <Container data-aos="fade-up">
      <LeftController><Title>Xem ngay các dòng sản phẩm cực hot</Title></LeftController>
      <RightController>
      {categoryElement.map((item) => (
        <Category key={item.id} item={item}/>
      ))}
      </RightController>
    </Container>
  );
};

export default Categories;
