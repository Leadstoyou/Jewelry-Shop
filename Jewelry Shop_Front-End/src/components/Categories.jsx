import styled from "styled-components";
import { categoryElement } from "../data";
import Category from "./Category";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";
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
`;
const Title = styled.h4`
  font-weight: bolder;
`;
const RightController = styled.div`
  flex-basis: 75%;
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 5%;
`;
const Categories = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  return (
    <Container data-aos="fade-up">
      <LeftController>
        <Title>Xem ngay các dòng sản phẩm cực hot</Title>
      </LeftController>
      {categoryElement.map((item) => (
        <Link to={`/collections/${item.sub_name}`} key={item.id}>
          <RightController>
            <Category key={item.id} item={item} />
          </RightController>
        </Link>
      ))}
    </Container>
  );
};

export default Categories;
