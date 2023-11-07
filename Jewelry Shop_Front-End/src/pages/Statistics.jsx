import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BarChart } from "@mui/x-charts";
import Pagination from "react-bootstrap/Pagination";
import { orderInMonthAPI } from "../services/connectApi.js";
import { amountInMonthAPI } from "../services/connectApi.js";
import Table from "react-bootstrap/Table";
import { getAllOrder } from "../services/connectApi.js";
import { toast, ToastContainer } from "react-toastify";
import RiseLoader from "react-spinners/RiseLoader";
import { CircularProgress } from "@mui/material";
import { getAllOrderToExcel } from "../services/connectApi.js";
import * as XLSX from "xlsx";

const Container = styled.div`
  padding-left: 3%;
  padding-bottom: 100px;
`;
const PageControl = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 5%;

  margin-bottom: 20px;
`;
const Header = styled.div`
  text-align: center;
`;
const Chart = styled.div`
  display: flex;
`;
const ChartOne = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const TableController = styled.div`
  margin-top: 5%;

  margin-left: 5%;
  height: 650px;
`;
const ElemetOne = styled.div``;
const ElemetTwo = styled.div``;
const ButtonExcel = styled.button`
  background-color: #058c05;
  color: white;
  border: none;
  font-weight: bolder;
  padding: 10px;
  border-radius: 5%;
  &:hover {
    background-color: #75ea75;
  }
`;
const Statistics = () => {
  const [spin, setSpin] = useState(false);
  const [orderInMonth, setOrderInMonth] = useState([]);
  const [amountInMonth, setAmountInMonth] = useState([]);
  const [allOrder, setGetAllProduct] = useState();
  const [loading, setLoading] = useState(true);
  const [textSearch, setTextSearch] = useState("");
  const [dataExcel, setDataExcel] = useState();
  useEffect(() => {
    const dataCovert = async () => {
      await getAllOrderToExcel(setDataExcel);
    };
    dataCovert();
  }, []);
  useEffect(() => {
    const fetchOrder = async () => {
      for (let i = 1; i <= 12; i++) {
        await orderInMonthAPI(i, orderInMonth, setOrderInMonth, setLoading);
      }
    };
    fetchOrder();
  }, []);

  useEffect(() => {
    const fetchOrder = async () => {
      for (let i = 1; i <= 12; i++) {
        await amountInMonthAPI(i, amountInMonth, setAmountInMonth, setLoading);
      }
    };
    fetchOrder();
  }, []);

  const formatOrderDate = (orderDate) => {
    const date = new Date(orderDate);
    return date.toLocaleString(); // Adjust the format as needed
  };

  let number = 0;
  const limitP = 10;
  const [totalPage, setTotalpage] = useState(0);
  const [activePage, setActivePage] = useState(1);
  useEffect(() => {
    setActivePage(1);
  }, [textSearch]);
  useEffect(() => {
    const fetchData = async () => {
      await getAllOrder(
        setGetAllProduct,
        setTotalpage,
        limitP,
        activePage,
        textSearch,
        setSpin
      );
    };
    fetchData();
  }, [activePage, textSearch]);
  const Allpage = [];
  for (let i = 1; i <= totalPage; i++) {
    Allpage.push(i);
  }
  console.log(Allpage);
  const handlePrev = () => {
    if (activePage > 1) {
      setActivePage(activePage - 1);
    }
  };
  const handleNext = () => {
    if (activePage < totalPage) {
      setActivePage(activePage + 1);
    }
  };

  const ButtonSearch = styled.button`
    border: none;
    background-color: blue;
    color: white;
    padding: 5px;
    &:hover {
      background-color: #5555f5;
    }
  `;

  console.log("hello");
  console.log(amountInMonth);

  const formatLargeNumber = (number) => {
    if (number >= 1e6) {
      return (number / 1e6).toFixed(1);
    }
    return number;
  };

  let monthOrder, quantityOrderInMonth;
  let amountOrder, amountOrderInMonth;
  monthOrder = orderInMonth?.map((o) => o?.month);
  quantityOrderInMonth = orderInMonth?.map((o) => o?.totalOrdersInMonth);
  amountOrder = amountInMonth?.map((o) => o?.month);
  amountOrderInMonth = amountInMonth?.map((o) => o?.totalOrdersInMonth);

  const maxAmount = Math.max(...amountOrderInMonth);
  console.log(amountOrder);
  console.log(amountOrderInMonth);

  const handleSearch = () => {
    console.log(textSearch);
    if (textSearch?.trim() === "") {
      toast?.error("Vui lòng nhập tên username hợp lệ !!!");
    }
  };

  const handleExportExcel = () => {
    console.log("hello");

    const wb = XLSX.utils.book_new();
    const allData = [];

    dataExcel.forEach((order) => {
      order.productList.forEach((product) => {
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
          totalAmount: product.quantity * product.price,
          orderDate: formatOrderDate(order.orderDate),
        });
      });
    });

    const ws = XLSX.utils.json_to_sheet(allData);
    XLSX.utils.book_append_sheet(wb, ws, "OrderManagement");
    XLSX.writeFile(wb, "MyOrderManagement.xlsx");
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
        <Container>
          <Header>
            <h1 style={{ paddingTop: "20px" }}>Statistics Order</h1>
          </Header>
          <Chart>
            <ChartOne>
              <ElemetOne>
                <BarChart
                  xAxis={[
                    {
                      id: "barCategories",
                      data: monthOrder,
                      scaleType: "band",
                    },
                  ]}
                  series={[
                    {
                      data: quantityOrderInMonth,
                    },
                  ]}
                  width={600}
                  height={500}
                />
              </ElemetOne>
              <ElemetTwo>
                <h6>Tổng số order từng tháng trên năm</h6>
              </ElemetTwo>
            </ChartOne>
            <ChartOne>
              <ElemetOne>
                <BarChart
                  xAxis={[
                    {
                      id: "barCategories",
                      data: amountOrder,
                      scaleType: "band",
                    },
                  ]}
                  yAxis={[
                    {
                      id: "quantityAxis",
                      domain: [0, maxAmount],
                      tickFormat: (value) => format(",")(value),
                    },
                  ]}
                  series={[
                    {
                      data: amountOrderInMonth,
                    },
                  ]}
                  width={700}
                  height={500}
                  margin={{ left: 90 }}
                />
              </ElemetOne>
              <ElemetTwo>
                <h6>Tổng số lợi nhuận từng tháng trên năm (tính theo VNĐ)</h6>
              </ElemetTwo>
            </ChartOne>
          </Chart>
          <TableController>
            <h1>Thông tin về các order</h1>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                margin: "20px",
              }}
            >
              <div>
                <input
                  placeholder="tìm kiếm username ..."
                  onChange={(e) => setTextSearch(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleSearch();
                    }
                  }}
                  style={{
                    outline: "none",
                    padding: "5px",
                    border: "none",
                    backgroundColor: "#e7e7e7",
                  }}
                />

                <ButtonSearch onClick={handleSearch}>Search</ButtonSearch>
              </div>
              <ButtonExcel onClick={handleExportExcel}>
                Export to excel
              </ButtonExcel>
            </div>

            {!spin && (!allOrder?.orders || allOrder?.orders?.length === 0) && (
              <h1 style={{marginTop:'50px'}}>
                Không tồn tại order bạn vừa tìm kiếm{" "}
                <span style={{ color: "red" }}>"{textSearch}"</span>
              </h1>
            )}
            {spin ? (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "150px",
                  marginBottom: "50px",
                  height: "200px",
                  overflow: "hidden",
                }}
              >
                <span>
                  <CircularProgress size={100} />
                </span>
              </div>
            ) : (
              allOrder?.orders &&
              allOrder?.orders.length > 0 && (
                <Table responsive border="1">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>User name</th>
                      <th>Address</th>
                      <th>Phone</th>
                      <th>Number of product</th>
                      <th>Total price</th>
                      <th>Time</th>
                    </tr>
                  </thead>

                  <tbody>
                    {allOrder?.orders?.map((o, index) => (
                      <tr key={index}>
                        <td>{number++}</td>
                        <td>{o?.userName}</td>
                        <td>{o?.userAddress}</td>
                        <td>{o?.userPhoneNumber}</td>
                        <td>{o?.productList?.length}</td>
                        <td>
                          {parseInt(o?.totalAmount).toLocaleString("vn-VI")}đ
                        </td>
                        <td>{formatOrderDate(o?.orderDate)}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )
            )}
            {!spin && allOrder?.orders?.length > 0 && (
              <PageControl>
                <Pagination>
                  <Pagination.Prev onClick={handlePrev} />
                  {Allpage.map((page, index) => (
                    <Pagination.Item
                      key={index}
                      active={page === activePage}
                      onClick={() => {
                        setActivePage(page);
                      }}
                    >
                      {page}
                    </Pagination.Item>
                  ))}
                  <Pagination.Next onClick={handleNext} />
                </Pagination>
              </PageControl>
            )}
          </TableController>

          <ToastContainer autoClose={500} />
        </Container>
      )}
    </>
  );
};

export default Statistics;
