import React, { useEffect, useState } from "react";
import HistoryCart from "../components/history/History.jsx";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

const HistoryPage = () => {
  const [historyData, setHistoryData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated data (replace this with your actual data structure)
    const fakeHistoryData = [
        {
          id: 1,
          orderDate: "2023-09-28",
          products: [
            {
              id: 1,
              description: "Description for Product 1",
              selectedQuantity: 2,
              price: 10,
              image: "https://product.hstatic.net/200000103143/product/product1_image.png",
              priceLarge: 15,
              productCode: "P123",
            },
            {
              id: 2,
              description: "Description for Product 2",
              selectedQuantity: 1,
              price: 15,
              image: "https://product.hstatic.net/200000103143/product/product2_image.png",
              priceLarge: 20,
              productCode: "P456",
            },
          ],
          status: "Ordered",
        },
        {
          id: 2,
          orderDate: "2023-09-27",
          products: [
            {
              id: 3,
              description: "Description for Product 3",
              selectedQuantity: 3,
              price: 20,
              image: "https://product.hstatic.net/200000103143/product/product3_image.png",
              priceLarge: 30,
              productCode: "P789",
            },
          ],
          status: "Paid",
        },
        {
          id: 3,
          orderDate: "2023-09-26",
          products: [
            {
              id: 1,
              description: "Description for Product 1",
              selectedQuantity: 1,
              price: 10,
              image: "https://product.hstatic.net/200000103143/product/product1_image.png",
              priceLarge: 15,
              productCode: "P123",
            },
          ],
          status: "Cancelled",
        },
      ];
      

    // Simulate a delay to mimic an API request
    setTimeout(() => {
      setHistoryData(fakeHistoryData);
      setLoading(false);
    }, 1000); // Adjust the delay as needed

    // You can remove the above setTimeout and replace it with your actual fetch call once you have a real API.
  }, []);

  return (
    
    <div>
    <Navbar className="fixed-navbar" />
      <h1>Order History</h1>
      {loading ? (
        <p>Loading history data...</p>
      ) : historyData ? (
        <HistoryCart historyData={historyData} />
      ) : (
        <p>Error loading history data.</p>
      )}
      <Footer/>
    </div>
  );
};

export default HistoryPage;
