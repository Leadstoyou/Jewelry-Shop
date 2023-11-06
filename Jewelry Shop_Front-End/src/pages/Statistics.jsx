import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BarChart } from "@mui/x-charts";
import Pagination from "react-bootstrap/Pagination";
import { orderInMonthAPI } from "../services/connectApi.js";
import { amountInMonthAPI } from "../services/connectApi.js";
import Table from "react-bootstrap/Table";
import { getAllOrder } from "../services/connectApi.js";
import RiseLoader from "react-spinners/RiseLoader";
import { CircularProgress } from "@mui/material";
const Container = styled.div`
  padding-left: 3%;
`;
const PageControl = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 5%;
  margin-top: 20px;
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
  margin-bottom: 2%;
  margin-left: 5%;
`;
const ElemetOne = styled.div``;
const ElemetTwo = styled.div``;
const Statistics = () => {
  const [spin, setSpin] = useState(false);
  const [orderInMonth, setOrderInMonth] = useState([]);
  const [amountInMonth, setAmountInMonth] = useState([]);
  const [allOrder, setGetAllProduct] = useState();
  const [loading, setLoading] = useState(true);
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
  const limitP = 5;
  const [totalPage, setTotalpage] = useState(0);
  const [activePage, setActivePage] = useState(1);
  useEffect(() => {
    const fetchData = async () => {
      await getAllOrder(
        setGetAllProduct,
        setTotalpage,
        limitP,
        activePage,
        setSpin
      );
    };
    fetchData();
  }, [activePage]);
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

  console.log("all order");
  console.log(allOrder?.orders);

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
            {spin ? (
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "50px",
                    marginBottom:'50px',
                  }}
                >
                  <span>
                    <CircularProgress size={100} />
                  </span>
                </div>
              ) : (
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
             )}
          </TableController>
          {allOrder?.orders?.length > 0 && (
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
        </Container>
      )}
    </>
  );
};

export default Statistics;
