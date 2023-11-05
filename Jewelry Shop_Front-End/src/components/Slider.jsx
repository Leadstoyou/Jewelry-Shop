import styled from "styled-components";
import slide1 from "../assets/banner1.png";
import slide2 from "../assets/banner2.png";
import slide3 from "../assets/banner3.png";
import ArrowLeftOutlined from "@mui/icons-material/ArrowLeftOutlined";
import ArrowRightOutlined from "@mui/icons-material/ArrowRightOutlined";
import { useState, useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";
const Container = styled.div`
  margin-top: 5vh;
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  overflow: hidden;
`;

const Wrapper = styled.div`
  display: flex;
  /* transition: transform 1.5s ease-out; */
  transform: translateX(${(props) => props.slideIndex * -100}vw);
`;

const Slide = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;

  justify-content: center;
`;

const ImgContainer = styled.div`
  width: 90%;
  align-items: center;
  justify-content: center;
`;

const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: white;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${(props) => props.direction === "left" && "7%"};
  right: ${(props) => props.direction === "right" && "7%"};
  margin: auto;
  opacity: 0.5;
  &:hover {
    background-color: black;
    color: white;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 90%;
  object-fit: cover;
  cursor: pointer;
`;

const Slider = () => {
  const navigate = useNavigate();
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  const [slideIndex, setSlideIndex] = useState(0);

  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex((prevIndex) =>
        prevIndex === 0 ? prevIndex + 1 : prevIndex - 1
      );
    } else if (direction === "right") {
      setSlideIndex((prevIndex) => (prevIndex === 2 ? 0 : prevIndex + 1));
    }
  };

  const autoAdvance = () => {
    handleClick("right");
  };

  useEffect(() => {
    const intervalId = setInterval(autoAdvance, 4000); //

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Container data-aos="fade-up">
      <Wrapper slideIndex={slideIndex}>
        <Slide>
          <ImgContainer
            onClick={() => navigate(`/product/651858b64421d5bd27b66ee8`)}
          >
            <Image src={slide1} />
          </ImgContainer>
        </Slide>
        <Slide>
          <ImgContainer>
            <Image
              src={slide2}
              onClick={() => navigate(`/product/65185a1ad1e22761ad950565`)}
            />
          </ImgContainer>
        </Slide>
        <Slide>
          <ImgContainer>
            <Image
              src={slide3}
              onClick={() => navigate(`/product/65185b40d1e22761ad95056b`)}
            />
          </ImgContainer>
        </Slide>
      </Wrapper>
      <Arrow direction="left" onClick={() => handleClick("left")}>
        <ArrowLeftOutlined />
      </Arrow>
      <Arrow direction="right" onClick={() => handleClick("right")}>
        <ArrowRightOutlined />
      </Arrow>
    </Container>
  );
};

export default Slider;
