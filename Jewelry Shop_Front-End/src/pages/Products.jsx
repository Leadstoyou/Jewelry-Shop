import styled from 'styled-components'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ProductBody from '../components/products/ProductBody'
import RiseLoader from "react-spinners/RiseLoader";
import { useEffect, useState } from 'react';
const Container = styled.div`
    font-family: "Jost", sans-serif;
`
const Ptag = styled.div`
   display: flex;
   align-items: center;
   margin-left: 5%;
`

const Spinner = styled.div`
  height: 100%;
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
`
const Products = () => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);
  return (
    <>
      {loading ? (
        <Container  style={{ height: '100vh',display: 'flex', flexDirection: 'column',alignItems: 'center',justifyContent: 'center'}}>
          <RiseLoader color={"#575855"} size={30} loading={loading} />
        </Container>
      ) : (
    <Container>
      
      <Navbar />
      <Ptag>
      <p style={{marginTop : '100px'}}>Trang chủ / Tất cả sản phẩm /<span style={{opacity:'0.5'}}> Bông tai bạc mạ vàng 14k hình vỏ sò Disney The Little Mermaid được đính ngọc trai nhân tạo màu trắng </span></p>
      </Ptag>
      <ProductBody />
      <Footer />
    </Container>
  )}</>)
}

export default Products
