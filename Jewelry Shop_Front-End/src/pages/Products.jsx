import styled from "styled-components";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductBody from "../components/products/ProductBody";
import RiseLoader from "react-spinners/RiseLoader";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import { viewCartAPI } from "../services/connectApi.js";
import { cartValue } from "../App.jsx";
import { CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";
const Container = styled.div`
  font-family: "Jost", sans-serif;
`;
const Ptag = styled.div`
  display: flex;
  align-items: center;
  margin-left: 5%;
`;

const Spinner = styled.div`
  height: 100%;
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Parent = styled.div`
  position: relative;
`;
const ViewCart = styled.div`
  z-index: 1;
  background-color: white;
  position: fixed; /* Set position to fixed */
  top: 80px;
  right: 10px;
  width: 40%;
  /* height: 380px;
   */
  height: 40%;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
`;
const ViewCartNavbar = styled.div`
  text-align: center;
  height: 10%;
  background-color: #d2cfcf;
  position: relative;
`;
const Close = styled.div`
  position: absolute;
  top: 0;
  right: 15px;
  color: #606060;
  font-weight: bolder;
  cursor: pointer;
  &:hover {
    color: black;
  }
`;
const Body = styled.div`
  height: 70%;
  overflow: scroll;
`;
const CardItem = styled.div``;

const CheckountElement = styled.div`
  height: 10%;
  text-align: center;
  color: white;
  background-color: #383737;
  cursor: pointer;
  &:hover {
    background-color: black;
  }
`;

const Total = styled.div`
  height: 10%;
  text-align: center;
  color: white;
  background-color: #ea4747;
`;

const Products = () => {
  const navigate = useNavigate();
  var { number } = useContext(cartValue ? cartValue : 0);
  const { cartView, setViewCart, setShowCartPopup, showCartPopup } =
    useContext(cartValue);
  const { cartData, setCartData } = useContext(cartValue);
  const [spine, setSpin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({});

  const { id } = useParams();

  const [idPro,setIdPro] = useState(id)

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      try {
        const response = await axios.get(
          `http://localhost:9999/api/v1/products/get/${idPro}`
        );
        const data = response.data.data;
        setShowCartPopup(false);
        setProduct(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [idPro]);

  useEffect(() => {
    if (showCartPopup === false) {
      setSpin(true);
    }
  }, [showCartPopup]);

  return (
    <>
      {loading ? (
        <Container
          style={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <RiseLoader color={"#575855"} size={30} loading={loading} />
        </Container>
      ) : (
        <Container>
          <Navbar />

          <Parent>
            <ViewCart style={{ display: showCartPopup ? "block" : "none" }}>
              <ViewCartNavbar>
                <p style={{ fontWeight: "bolder" }}>Cart Info</p>
                <Close onClick={() => setShowCartPopup(false)}>x</Close>
              </ViewCartNavbar>
              {spine ? (
                <div
                  style={{
                    display: "flex",
                    marginTop: "15%",
                    justifyContent: "center",
                  }}
                >
                  <span>
                    <CircularProgress />
                  </span>
                </div>
              ) : (
                <>
                  <Body>
                    <CardItem>
                      <table style={{ width: "650px" }}>
                        <thead
                          style={{
                            backgroundColor: "#e5e0e0",
                            position: "sticky",
                            top: 0,
                            zIndex: 1,
                          }}
                        >
                          <tr style={{ textAlign: "center" }}>
                            <th>#</th>
                            <th>Image</th>
                            <th>Color</th>
                            <th>Material</th>
                            <th>Size</th>
                            <th>Quantity</th>
                            <th>Price</th>
                          </tr>
                        </thead>

                        <tbody>
                          {cartView?.productList &&
                            cartView?.productList.map((c) => (
                              <tr style={{ borderBottom: "1px solid #e5e0e0" }}>
                                <td
                                  style={{ width: "5%", textAlign: "center" }}
                                >
                                  {number++}
                                </td>
                                <td
                                  style={{
                                    width: "25%",
                                    height: "70px",
                                    textAlign: "center",
                                  }}
                                >
                                  <img
                                    src={c?.productImage}
                                    width="100%"
                                    height="100%"
                                  />
                                </td>
                                <td
                                  style={{ width: "13%", textAlign: "center" }}
                                >
                                  {c?.color}
                                </td>
                                <td
                                  style={{ width: "13%", textAlign: "center" }}
                                >
                                  {c?.material}
                                </td>
                                <td
                                  style={{ width: "13%", textAlign: "center" }}
                                >
                                  {c?.size}
                                </td>
                                <td
                                  style={{ width: "13%", textAlign: "center" }}
                                >
                                  {c?.quantity}
                                </td>
                                <td
                                  style={{ width: "18%", textAlign: "center" }}
                                >
                                  {c?.price?.toLocaleString("vi-VN")}đ
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </CardItem>
                  </Body>
                  <Total>
                    {cartView && (
                      <div style={{ textAlign: "center" }}>
                        <p style={{ fontWeight: "bolder", marginTop: "10px" }}>
                          {" "}
                          Total:&nbsp;&nbsp;&nbsp;
                          {cartView?.total?.toLocaleString("vi-VN")}đ
                        </p>
                      </div>
                    )}
                  </Total>

                  <CheckountElement onClick={() => navigate("/cart")}>
                    <p>Go to Cart page to edit and checkout</p>
                  </CheckountElement>
                </>
              )}
            </ViewCart>
            <Ptag>
              <p style={{ marginTop: "100px" }}>
                Trang chủ / Tất cả sản phẩm /
                <span style={{ opacity: "0.5" }}> {product.productName} </span>
              </p>
            </Ptag>
            <ProductBody idPro={idPro} setIdPro={setIdPro}  product={product} setSpin={setSpin} />
          </Parent>
          <Footer />
        </Container>
      )}
    </>
  );
};

export default Products;
