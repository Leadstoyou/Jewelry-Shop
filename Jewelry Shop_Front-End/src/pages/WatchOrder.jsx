import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { viewOrder } from "../api/connectApi.js";
import { toast } from "react-toastify";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  font-family: "Jost", sans-serif;
  margin-top: 9%;
  margin-bottom: 5%;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 2%;
`;

const Title = styled.h1``;

const Text = styled.p`
  margin-top: 10px;
  font-weight: bold;
  text-decoration: underline;
`;

const Body = styled.div`
  border: 1px solid #dfdddd;
  margin-left: 2%;
  margin-right: 2%;
  margin-bottom: 3%;
`;
const Detail = styled.div``;
const InDetail = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Img = styled.img`
  width: 100%;
  height: 200px;
`;
const ButtonBuyAgain = styled.button`
  border: none;
  background-color: green;
  padding: 10px;
  border-radius: 5%;
  color: white;
  &:hover {
    background-color: #68e668;
  }
`;
const ViewMore = styled.button`
  border: none;
  background-color: black;
  color: white;
  padding: 10px;
  &:hover {
    background-color: #727171;
  }
`;
const ViewLess = styled.button`
  border: none;
  background-color: red;
  color: white;
  padding: 10px;
  &:hover {
    background-color: #ef6f6f;
  }
`;

const ViewLessInOrder = styled.button`
  border: none;
  background-color: grey;
  color: white;
  padding: 5px;
  &:hover {
    background-color: #bab8b8;
  }
`;

const ViewMoreInOrder = styled.button`
  border: none;
  background-color: #1a1919;
  color: white;
  padding: 5px;
  &:hover {
    background-color: #797777;
  }
`;

const WatchOrder = () => {
  const [numberProduct, setNumberProduct] = useState(3);
  const [numberOrder, setNumberOrder] = useState(2);
  const [allOrder, setOrderByUser] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    viewOrder(toast, setOrderByUser);
  }, []);

  const totalQuantityOfAllOrder = allOrder?.map((order, index) => {
    const totalPriceOfOrder = order?.productList?.reduce(
      (total, product) => {
        return total + product.quantity;
      },
      0
    );
    return totalPriceOfOrder;
  }, 0);

  console.log(`Total Quantity of All Orders: ${totalQuantityOfAllOrder}`);

  console.log("total");
  console.log(totalQuantityOfAllOrder);

  const formatOrderDate = (orderDate) => {
    const date = new Date(orderDate);
    return date.toLocaleString(); // Adjust the format as needed
  };
  const handleViewmore = () => {
    setNumberProduct(numberProduct + 3);
  };
  const handleViewless = () => {
    setNumberProduct(numberProduct - 3);
  };

  const handleClickMoreOrder = () => {
    setNumberOrder(numberOrder + 2);
  };
  const handleClickLessOrder = () => {
    setNumberOrder(numberOrder - 2);
  };

  return (
    <>
      <Navbar />
      <Container>
        <Header>
          <Title>Các đơn hàng đã mua thành công</Title>
          <Text>
            Có <span style={{ color: "red" }}>{allOrder?.length}</span> đơn hàng
          </Text>
        </Header>

        {allOrder && allOrder.length > 0 ? (
          allOrder.slice(0, numberProduct).map((order, index) => (
            <Body key={index}>
              <div
                style={{
                  padding: "15px",
                  border: "1px solid #dfdddd",
                  backgroundColor: "#d6d4d4c9",
                }}
              >
                <span style={{ fontWeight: "bolder" }}>
                  <AccessTimeFilledIcon />
                  Order Date:{" "}
                </span>
                {formatOrderDate(order.orderDate)}
              </div>
              <Detail>
                <table>
                  <thead>
                    <tr style={{ border: "1px solid #dfdddd" }}>
                      <th style={{ textAlign: "center" }}>Image</th>
                      <th style={{ textAlign: "center" }}>Name</th>
                      <th style={{ textAlign: "center" }}>Category</th>
                      <th style={{ textAlign: "center" }}>Size</th>
                      <th style={{ textAlign: "center" }}>Color</th>
                      <th style={{ textAlign: "center" }}>Material</th>
                      <th style={{ textAlign: "center" }}>Quantity</th>
                      <th style={{ textAlign: "center" }}>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order?.productList
                      ?.slice(0, numberOrder)
                      ?.map((o, index) => (
                        <tr key={index} style={{ border: "1px solid #dfdddd" }}>
                          <td style={{ width: "10%", textAlign: "center" }}>
                            <Img src={o?.productImage} alt="Product" />
                          </td>
                          <td style={{ width: "19%", textAlign: "center" }}>
                            {o?.productName}
                          </td>
                          <td style={{ width: "10%", textAlign: "center" }}>
                            {o?.productCategory}
                          </td>
                          <td style={{ width: "10%", textAlign: "center" }}>
                            {o?.size[0]}
                          </td>
                          <td style={{ width: "10%", textAlign: "center" }}>
                            {o?.color[0]}
                          </td>
                          <td style={{ width: "10%", textAlign: "center" }}>
                            {o?.material[0]}
                          </td>
                          <td style={{ width: "10%", textAlign: "center" }}>
                            {o?.quantity}
                          </td>
                          <td style={{ width: "10%", textAlign: "center" }}>
                            {o?.price?.toLocaleString("vn-VI")}đ
                          </td>
                          <td style={{ width: "8%", textAlign: "center" }}>
                            <ButtonBuyAgain
                              onClick={() =>
                                navigate(`/product/${o.product_id}`)
                              }
                            >
                              Mua lại
                            </ButtonBuyAgain>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                {order?.productList?.length > 2 && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "10px",
                      padding: "5px",
                    }}
                  >
                    {" "}
                    {numberOrder < order?.productList?.length && (
                      <ViewMoreInOrder onClick={handleClickMoreOrder}>
                        More
                      </ViewMoreInOrder>
                    )}
                    {numberOrder > 2 && (
                      <ViewLessInOrder onClick={handleClickLessOrder}>
                        Less
                      </ViewLessInOrder>
                    )}
                  </div>
                )}
                <div
                  style={{
                    width: "100%",
                    textAlign: "center",
                    padding: "10px",
                    backgroundColor: "#bcf1bc",
                    display:'flex',
                    alignContent:'center',
                    justifyContent:'space-between',
                  }}
                >
                  <h6>
                    {totalQuantityOfAllOrder[index]} sản phẩm
                  </h6>
                  <h3>
                    Total:{" "}
                    {parseInt(order?.totalAmount)?.toLocaleString("vi-VN")}đ
                  </h3>
                </div>
              </Detail>
            </Body>
          ))
        ) : (
          <div
            style={{ textAlign: "center", marginTop: "5%", marginBottom: "5%" }}
          >
            <h1>No orders found.</h1>
          </div>
        )}
        <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
          <div
            style={{ display: "flex", justifyContent: "center", gap: "20px" }}
          >
            {numberProduct < allOrder?.length && (
              <ViewMore onClick={handleViewmore}>View More</ViewMore>
            )}
            {numberProduct > 3 && (
              <ViewLess onClick={handleViewless}>View Less</ViewLess>
            )}
          </div>
        </div>
      </Container>

      <Footer />
    </>
  );
};

export default WatchOrder;
