import styled from "styled-components";
import { ProductPage } from "../../data";
import Product from "../products/Product";
import Aos from "aos";
import "aos/dist/aos.css";
import ArrowLeftOutlined from "@mui/icons-material/ArrowLeftOutlined";
import ArrowRightOutlined from "@mui/icons-material/ArrowRightOutlined";
import { useState, useRef, useEffect } from "react";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { getAllProducts } from "../../services/connectApi.js";
const Container = styled.div`
  margin-top: 50px;
  position: relative;
  overflow: hidden;
`;

const Arrow = styled.div`
  cursor: pointer;
  width: 50px;
  height: 50px;
  background-color: black;
  color: white;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${(props) => props.direction === "left" && "5vw"};
  right: ${(props) => props.direction === "right" && "5vw"};
  margin: auto;
  opacity: ${(props) => props.opacity};
  transition: opacity 5s ease-in-out;
`;

const Title = styled.div``;
const Text = styled.h1`
  margin-left: 50px;
`;

const ListItem = styled.div`
  width: 500%;
  margin-left: 10px;

  padding-right: 10px;
  display: flex;
`;

const Wrapper = styled.div`
  z-index: 5;
  transition: transform 5s ease;
  transform: translateX(${(props) => props.translateX}px);
`;

const List = (props) => {
  const {idPro, setIdPro}=props
  const [allproducts, setAllproducts] = useState();
  const [opa, setOpa] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const containerRef = useRef(null);

  const handleMouseEnter = () => {
    setOpa(1);
  };

  const handleMouseLeave = () => {
    setOpa(0);
  };

  useEffect(() => {
    const fetchData = async () => {
      await getAllProducts(setAllproducts);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        setTranslateX((prevTranslateX) =>
          prevTranslateX === 0 ? -containerWidth : 0
        );
      }
    }, 10000);

    return () => clearInterval(intervalId);
  }, []);

  const handleClick = (direction) => {
    if (direction === "left") {
      const containerWidth = containerRef.current.clientWidth;
      setTranslateX(0);
    } else if (direction === "right") {
      setTranslateX(-containerRef.current.clientWidth);
    }
  };
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  return (
    <Container
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={containerRef}
    >
      <Title style={{ textAlign: "center" }}>
        <Text>Có thể bạn cũng thích</Text>
      </Title>
      <Wrapper translateX={translateX}>
        <ListItem>
          {allproducts?.map((product) => (
            <Product idPro={idPro} setIdPro={setIdPro} key={product?._id} props={product}  />
          ))}
        </ListItem>
      </Wrapper>
      <Arrow direction="left" opacity={opa} onClick={() => handleClick("left")}>
        <ArrowLeftOutlined />
      </Arrow>
      <Arrow
        direction="right"
        opacity={opa}
        onClick={() => handleClick("right")}
      >
        <ArrowRightOutlined />
      </Arrow>
    </Container>
  );
};

export default List;
