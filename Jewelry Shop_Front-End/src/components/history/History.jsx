import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: center;
  min-height: 50vh;
  padding: 10px 10px 50px 10px;
  background-color: #f6f6f6;

  @media (max-width: 1500px) {
    padding: 25px;
  }
  margin-top: 6vh;
`;

const LeftPanel = styled.div`
  flex: 1;
  padding: 20px 30px 0 20px;
  overflow-y: auto;
  /* Set a fixed height to match the right panel */
  height: 40vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const RightPanel = styled.div`
  flex: 3;
  padding: 0 0 0 10px;
  position: sticky;
  top: 0;
`;

const Title = styled.h2`
  margin-top: 100px;
  text-align: center;
  color: #333;
`;

const ScrollingArea = styled.div`
  max-height: 60vh;
  overflow-y: auto;
`;

const ProductTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 30px;
  /* border: 1px solid #ddd; */
  background-color: white;
`;

const ProductTableRow = styled.tr`
  border-bottom: 1px solid #ddd;
`;

const ProductTableHeader = styled.th`
  border-bottom: 3px solid #f7f7f7;
  padding: 8px;
  text-align: center;
  font-weight: bold;
`;

const ProductTableData = styled.td`
  padding: 10px 0 10px 0;
  
  text-align: center;
`;

const UpdateProfileButton = styled.button`
  background-color: black;
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;
  border-radius: 1px;

  width: 100%; /* Default to 100% width */

  @media (min-width: 1300px) {
    width: 70%; /* Reduce to 50% width on screens wider than 768px */
  }
`;

const NavBar = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const NavButton = styled.button`
  background-color: ${({ active }) => (active ? "black" : "white")};
  color: ${({ active }) => (active ? "white" : "black")};
  padding: 10px 20px;
  border: 2px solid ${({ active }) => (active ? "black" : "white")};
  cursor: pointer;
  margin: 0 10px;
  border-radius: 4px;
  font-size: 16px;
  transition: background-color 0.3s, color 0.3s, border-color 0.3s, opacity 0.3s;

  &:hover {
    background-color: black;
    color: white;
    border-color: black;
    opacity: 0.8; /* Add fade-in effect on hover */
  }
`;


const LinkToCart = styled(Link)`
font-weight:bold;
  text-decoration: none;
  color: black;
  cursor: pointer;
  margin-bottom: 140px;
  margin-left:50px;
`;
const HistoryPage = () => {
  const [currentPage, setCurrentPage] = React.useState("Ordered");
  const shippingStatuses = ["Ordered", "Paid", "Cancelled"];
  // Simulated data (replace this with your actual data structure)
  const historyData = [
    {
      id: 1,
      orderDate: "2023-09-28",
      products: [
        {
          id: 1,
          description: "Description for Product 1",
          productType: "Type 1",
          selectedQuantity: 2,
          price: 10,
          image:
            "https://product.hstatic.net/200000103143/product/791691c03_b_3dc02e60716b4a2d91771996a504bace_ab179a98f5b64529ba73c5bc662c9ccc_master.png",
          priceLarge: 15,
          productCode: "P123",
        },
        {
          id: 1,
          description: "Description for Product 1",
          productType: "Type 1",
          selectedQuantity: 2,
          price: 10,
          image:
            "https://product.hstatic.net/200000103143/product/791691c03_b_3dc02e60716b4a2d91771996a504bace_ab179a98f5b64529ba73c5bc662c9ccc_master.png",
          priceLarge: 15,
          productCode: "P123",
        },
        {
          id: 2,
          description: "Description for Product 2",
          productType: "Type 1",
          selectedQuantity: 1,
          price: 15,
          image:
            "https://product.hstatic.net/200000103143/product/791691c03_b_3dc02e60716b4a2d91771996a504bace_ab179a98f5b64529ba73c5bc662c9ccc_master.png",
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
          productType: "Type 1",
          selectedQuantity: 3,
          price: 20,
          image:
            "https://product.hstatic.net/200000103143/product/791691c03_b_3dc02e60716b4a2d91771996a504bace_ab179a98f5b64529ba73c5bc662c9ccc_master.png",
          priceLarge: 30,
          productCode: "P789",
        },
      ],
      status: "Paid",
    },
    {
      id: 2,
      orderDate: "2023-09-27",
      products: [
        {
          id: 3,
          description: "Description for Product 3",
          productType: "Type 1",
          selectedQuantity: 3,
          price: 20,
          image:
            "https://product.hstatic.net/200000103143/product/791691c03_b_3dc02e60716b4a2d91771996a504bace_ab179a98f5b64529ba73c5bc662c9ccc_master.png",
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
          productType: "Type 1",
          selectedQuantity: 1,
          price: 10,
          image:
            "https://product.hstatic.net/200000103143/product/791691c03_b_3dc02e60716b4a2d91771996a504bace_ab179a98f5b64529ba73c5bc662c9ccc_master.png",
          priceLarge: 15,
          productCode: "P123",
        },
      ],
      status: "Cancelled",
    },
  ];

  const calculateTotalAmount = (products) => {
    return products.reduce(
      (total, product) => total + product.selectedQuantity * product.price,
      0
    );
  };

  const handleUpdateProfileClick = () => {
    // Add your logic for handling the "Update Profile" button click here
    console.log("Update Profile button clicked");
  };

  const handleStatusClick = (status) => {
    setCurrentPage(status);
  };

  return (
    <div>
      <Title>Order History</Title>
      <Container>
        <LeftPanel>
          <div>
            {/* User profile content */}
            <p>
              <strong>Name:</strong> John Doe
            </p>
            <p>
              <strong>Email:</strong> john@example.com
            </p>
            <p>
              <strong>Phone Number:</strong> 123-456-7890
            </p>
            <p>
              <strong>Address:</strong> 123 Main St, City
            </p>
            <UpdateProfileButton onClick={handleUpdateProfileClick}>
              Update Profile
            </UpdateProfileButton>
          </div>
          
          <LinkToCart to="/cart">Go to cart >></LinkToCart>
        
        
          
         


        </LeftPanel>
        <RightPanel>
        <div>
            {/* Navigation bar for switching between statuses */}
            <NavBar>
              {shippingStatuses.map((status) => (
                <NavButton
                  key={status}
                  onClick={() => handleStatusClick(status)}
                  active={currentPage === status}
                >
                  {status}
                </NavButton>
              ))}
            </NavBar>
          </div>
          <ScrollingArea>
            {historyData
            .filter((order) => order.status === currentPage)
            .map((order) => (
              <ProductTable key={order.id}>
                <ProductTableRow
                  style={{ backgroundColor: "black", color: "white" }}
                >
                  <ProductTableHeader>
                    Order Code: {order.id}
                  </ProductTableHeader>
                  <ProductTableHeader></ProductTableHeader>
                  <ProductTableHeader></ProductTableHeader>
                  <ProductTableHeader></ProductTableHeader>
                  <ProductTableHeader></ProductTableHeader>
                  <ProductTableHeader>
                    Shipping Status: {order.status}
                  </ProductTableHeader>
                </ProductTableRow>
                {order.products.map((product) => (
                  <ProductTableRow key={product.id}>
                    <ProductTableData>
                      <img
                        src={product.image}
                        alt="Product"
                        style={{ width: "100px", height: "100px" }}
                      />
                    </ProductTableData>
                    <ProductTableData style={{ marginLeft: "20px" }}>
                      <div style={{ marginLeft: "0px" }}>
                        <strong>{product.description}</strong>
                      </div>
                      <div style={{ marginLeft: "0px", marginRight: "40px" }}>
                        Product Type: {product.productType}
                      </div>
                      <div style={{ marginLeft: "0px", marginRight: "150px" }}>
                        SL: {product.selectedQuantity}
                      </div>
                    </ProductTableData>
                    <ProductTableData></ProductTableData>
                    <ProductTableData></ProductTableData>
                    <ProductTableData></ProductTableData>
                    <ProductTableData>{product.price}</ProductTableData>
                  </ProductTableRow>
                ))}
                <ProductTableRow>
                  <ProductTableData></ProductTableData>
                  <ProductTableData></ProductTableData>
                  <ProductTableData></ProductTableData>
                  <ProductTableData></ProductTableData>
                  <ProductTableData></ProductTableData>
                  
                  <ProductTableData>
                  <strong>Total Amount: {calculateTotalAmount(order.products)}</strong>
                  </ProductTableData>
                </ProductTableRow>
              </ProductTable>
            ))}
          </ScrollingArea>
          
        </RightPanel>
      </Container>
    </div>
  );
};

export default HistoryPage;
