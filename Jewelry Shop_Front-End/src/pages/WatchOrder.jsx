import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { viewOrder } from "../services/connectApi.js";
import { toast } from "react-toastify";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { useNavigate } from "react-router-dom";
import RiseLoader from "react-spinners/RiseLoader";
import * as XLSX from "xlsx";
const Container = styled.div`
  font-family: "Jost", sans-serif;
  margin-top: 9%;
  margin-bottom: 5%;
`;

const BackToTopButton = styled.button`
  display: none;
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 999;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
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
  background-color: #d81111;
  padding: 10px;
  border-radius: 5%;
  color: white;
  &:hover {
    background-color: #e66868;
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

const Button = styled.button`
  border: none;
  padding: 10px;
  background-color: #2828f8;
  color: white;
  &:hover {
    background-color: #8e8ef8;
  }
`;

const ButtonExport = styled.button`
  border: none;
  padding: 5px;
  background-color: #0e8c0e;
  color: white;
  font-weight: bolder;
  &:hover{
    background-color: #54ff7937;
  }
`

const WatchOrder = () => {
  const [loading, setLoading] = useState(false);
  const [backToTopVisible, setBackToTopVisible] = useState(false);
  const [numberProduct, setNumberProduct] = useState(3);
  const [numberOrder, setNumberOrder] = useState(2);
  const [allOrder, setOrderByUser] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    viewOrder(toast, setOrderByUser, setLoading);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 500) {
        setBackToTopVisible(true);
      } else {
        setBackToTopVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const totalQuantityOfAllOrder = allOrder?.map((order, index) => {
    const totalPriceOfOrder = order?.productList?.reduce((total, product) => {
      return total + product.quantity;
    }, 0);
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

  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleView = () =>{
    setNumberProduct(3)
  }


  const handleExportExcel = (order) => {
    console.log(order);
  
    const wb = XLSX.utils.book_new();
  
    const allData = [];
    let totalOrderAmount = 0; // Initialize totalOrderAmount
  
    order.productList.forEach((product) => {
      const totalAmount = product.quantity * product.price;
      totalOrderAmount += totalAmount; // Accumulate the totalAmount
  
      allData.push({
        userId: order.user_id,
        userName: order.userName,
        userAddress: order.userAddress,
        userEmail: order.userEmail,
        userPhoneNumber: order.userPhoneNumber,
        productName: product.productName,
        productCategory: product.productCategory,
        size: product.size.join(", "),
        color: product.color.join(", "),
        material: product.material.join(", "),
        quantity: product.quantity,
        price: product.price,
        productDescription: product.productDescription,
        productImage: product.productImage,
        totalAmount: totalAmount,
        orderDate: formatOrderDate(order.orderDate),
      });
    });
  
   
    allData.push({
      productDescription: "Total Amount:", 
      totalAmount: totalOrderAmount,
    });
  
    const ws = XLSX.utils.json_to_sheet(allData);
    XLSX.utils.book_append_sheet(wb, ws, `Order của ${order?.userName}`);
    XLSX.writeFile(wb, `Order của ${order?.userName}.xlsx`);
  };
  

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
        <>
          <Navbar />
          <Container>
            <Header>
              <Title>Các đơn hàng đã mua thành công</Title>
              <Text>
                Có <span style={{ color: "red" }}>{allOrder?.length}</span> đơn
                hàng
              </Text>
            </Header>
            {numberProduct > 3 && (
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "end",
                    marginBottom: "2%",
                  }}
                >
                  <Button onClick={handleView}>Hiển thị như trạng thái ban đầu</Button>
                </div>
              )}
            {allOrder && allOrder.length > 0 ? (
              allOrder.slice(0, numberProduct).map((order, index) => (
                <Body key={index}>
                  <div
                    style={{
                      padding: "15px",
                      border: "1px solid #dfdddd",
                      backgroundColor: "#d6d4d4c9",
                      display:'flex',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div>
                    <span style={{ fontWeight: "bolder" }}>
                      <AccessTimeFilledIcon />
                      Order Date:{" "}
                    </span>
                    {formatOrderDate(order.orderDate)}
                    </div>
                    <div>
                      <ButtonExport onClick={()=>handleExportExcel(order)}>Export to EXCEL</ButtonExport>
                    </div>
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
                            <tr
                              key={index}
                              style={{ border: "1px solid #dfdddd" }}
                            >
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
                        display: "flex",
                        alignContent: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <h6>{totalQuantityOfAllOrder[index]} sản phẩm</h6>
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
                style={{
                  textAlign: "center",
                  marginTop: "5%",
                  marginBottom: "5%",
                }}
              >
                <h1>No orders found.</h1>
              </div>
            )}
            <div
              style={{ display: "flex", justifyContent: "center", gap: "20px" }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "20px",
                }}
              >
                {numberProduct < allOrder?.length && (
                  <ViewMore onClick={handleViewmore}>View More</ViewMore>
                )}
                {numberProduct > 3 && (
                  <ViewLess onClick={handleViewless}>View Less</ViewLess>
                )}
              </div>
            </div>
            <BackToTopButton
              onClick={handleBackToTop}
              style={{ display: backToTopVisible ? "block" : "none" }}
            >
              <span>
                <ArrowUpwardIcon />
              </span>
              &nbsp; Back to Top
            </BackToTopButton>
          </Container>

          <Footer />
        </>
      )}
    </>
  );
};

export default WatchOrder;
