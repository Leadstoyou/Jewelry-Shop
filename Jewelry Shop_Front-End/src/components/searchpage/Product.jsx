import Aos from "aos";
import "aos/dist/aos.css";
import styled from "styled-components"
import img from '../../assets/searchproduct.png'
import { useEffect } from "react"
const Container = styled.div`
  cursor: pointer;
  overflow: hidden;
  .ImageController {
    width: 100%;
    height: 100%;
    
    transition: transform 1s ease; 
  }
  &:hover{
    .ImageController{
      
      transform: scale(1.3);
    
    }
  }
`
const ImageController = styled.div`
  
`
const Image = styled.img`
 width: 100%;
`
const DescController = styled.div`
  
`
const Text = styled.p``
const Title = styled.p``
const Price = styled.p``


const Product = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  return (
    <Container data-aos="fade-up">
      <div style={{overflow : 'hidden'}}>
      <ImageController className="ImageController">
         <Image className="Image" src={img} />
      </ImageController>
      </div>
      <DescController>
        <Text>Pandora</Text>
        <Title>Nhẫn vô cực mạ vàng 14k</Title>
        <Price>2,090,000<p style={{textDecoration: "underline",display: "inline"}}>đ</p></Price>
      </DescController>
    </Container>
  )
}

export default Product
