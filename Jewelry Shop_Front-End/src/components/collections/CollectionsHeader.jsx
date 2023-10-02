import styled from "styled-components";
import collections from '../../assets/collections.jpg'
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
const Container = styled.div`
  margin-top: 70px;
  margin-bottom: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content:  center;
`;
const Left=styled.div`
  flex-basis: 30%;
  display: flex;
  justify-content: center;
  align-items: center ;
`
const LeftController = styled.div``
const Bread = styled.div``
const BreadText = styled.p``
const Title = styled.div``
const TitleText = styled.h1`
  font-weight: bolder;
`
const Right = styled.div`
  flex-basis: 70%;
  height: 100%;
`
const ImageController= styled.div`
  height: 100%;
`
const Image = styled.img`
  width: 100%;
  height: 40vh;
  
`
const CollectionsHeader = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  return (
    <Container>
      <Left data-aos="fade-up">
        <LeftController>
          <Bread>
            <BreadText>Trang chủ &nbsp;&nbsp;/&nbsp;&nbsp;<span style={{color : "#848383"}}> Vòng tay </span></BreadText>
          </Bread>
          <Title>
            <TitleText style={{display:'inline-block'}}>Vòng tay</TitleText>&nbsp;&nbsp;<p style={{display:'inline-block'}}>(50)</p>
          </Title>
        </LeftController>
      </Left>
      <Right data-aos="fade-up">
        <ImageController>
          <Image src={collections}/>
        </ImageController>
      </Right>
    </Container>
  );
};

export default CollectionsHeader;