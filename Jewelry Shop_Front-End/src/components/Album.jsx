import styled from "styled-components";
import album1 from "../assets/album1.png";
import album2 from "../assets/album2.png";
import album3 from "../assets/album3.png";
import album4 from "../assets/album4.png";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
const Container = styled.div`
  text-align: center;
  margin-top: 15vh;
`;
const Header = styled.h1``;
const AlbumC = styled.div`
  display: flex;
  /* align-items: center;
  justify-content: center; */
`;
const AlbumItem = styled.div`
  cursor: pointer;
  width: 25vw;
  margin-right: 10px;
`;
const Controller = styled.div``;
const ImageController = styled.div``;
const Image = styled.img`
  width: 100%;
  height: 50vh;
`;
const Title = styled.h3``;
const ButtonController = styled.div`
  margin-top: 70px;
  box-sizing: border-box;
`;
const Button = styled.button`
  border: none;
  background-color: #2d2d2d;
  color: white;
  padding: 10px;
  cursor: pointer;
  &:hover{
    background-color: #626161;
  }
`;
const Album = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  return (
    <Container  data-aos="fade-up">
      <Header>Bộ Sưu Tập</Header>
      <AlbumC>
        <AlbumItem>
          <Controller>
            <ImageController>
              <Image src={album1} />
            </ImageController>
            <Title>Pandora Moments</Title>
            <ButtonController>
              <Button>XEM THÊM</Button>
            </ButtonController>
          </Controller>
        </AlbumItem>
        <AlbumItem>
          <Controller>
            <ImageController>
              <Image src={album2} />
            </ImageController>
            <Title>Pandora Signature</Title>
            <ButtonController>
              <Button>XEM THÊM</Button>
            </ButtonController>
          </Controller>
        </AlbumItem>
        <AlbumItem>
          <Controller>
            <ImageController>
              <Image src={album3} />
            </ImageController>
            <Title>Disney x Pandora</Title>
            <ButtonController>
              <Button>XEM THÊM</Button>
            </ButtonController>
          </Controller>
        </AlbumItem>
        <AlbumItem>
          <Controller>
            <ImageController>
              <Image src={album4} />
            </ImageController>
            <Title>Pandora Moments</Title>
            <ButtonController>
              <Button>XEM THÊM</Button>
            </ButtonController>
          </Controller>
        </AlbumItem>
      </AlbumC>
    </Container>
  );
};

export default Album;
