import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BarChart } from "@mui/x-charts";
import { orderInMonthAPI } from "../api/connectApi.js";
import { amountInMonthAPI } from "../api/connectApi.js";
import RiseLoader from "react-spinners/RiseLoader";

const Container = styled.div`
  padding-left: 3%;
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
const ElemetOne = styled.div``;
const ElemetTwo = styled.div``;
const Statistics = () => {
  const [orderInMonth, setOrderInMonth] = useState([]);
  const [amountInMonth, setAmountInMonth] = useState([]);
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
  // amountOrderInMonth = amountInMonth?.map((o) =>
  //   formatLargeNumber(o?.totalOrdersInMonth)
  // );
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
                <h6>
                  Tổng số lợi nhuận từng tháng trên năm (tính theo VNĐ)
                </h6>
              </ElemetTwo>
            </ChartOne>
          </Chart>
        </Container>
      )}
    </>
  );
};

export default Statistics;
