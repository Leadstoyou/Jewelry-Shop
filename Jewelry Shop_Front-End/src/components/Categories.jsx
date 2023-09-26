import styled from "styled-components";
import { categoryElement } from "../data";
import Category from "./Category";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
  margin-top: 100px;
`;

const Categories = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  return (
    <Container data-aos="fade-up">
      {categoryElement.map((item) => (
        <Category key={item.id} item={item} />
      ))}
    </Container>
  );
};

export default Categories;
