import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import styled from "styled-components";
import Menu from "@mui/icons-material/Menu";
import ManageProduct from '../components/dashboard/product/ManageProduct.jsx'
import ManageStaff from '../components/dashboard/ManageStaff.jsx'


  
const Container = styled.div`
  height: 1000px;
`;
const SidebarContainer = styled.div`
  position: fixed;
  height: 100vh;
  width: 4%;
  background-color: #a4a1a1;
`;
const ButtonController = styled.button`
  border: none;
  background-color: inherit;
  width: 100%;
  height: 5vh;
  cursor: pointer;
  &:hover {
    background-color: #484848;
  }
`;
const InsideDashboard = styled.div`
  text-align: center;
`;
const ItemIn = styled.div`
  cursor: pointer;
  margin-bottom: 20px;
  width: 100%;
  height: 100%;
  &:hover {
    background-color: #dedada;
    border-radius: 3px;
  }
`;
const Title = styled.h1``;
const DashboardItem = styled.div`
  display: flex;
  align-items: start;
  justify-content: start;
  flex-direction: column;
`;

function Example() {
  const [show, setShow] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState(null);

  const handleClose = () => {
    setShow(false);
    setSelectedComponent(null);
  };

  const handleShow = () => setShow(true);

  const renderComponent = (component) => {
    handleClose()
    setSelectedComponent(component);

  };

  return (
    <Container>
      <SidebarContainer>
        <ButtonController variant="primary" onClick={handleShow}>
          <Menu style={{ color: "white" }} />
        </ButtonController>
      </SidebarContainer>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header
          style={{ backgroundColor: "grey", color: "white" }}
          closeButton
        >
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <DashboardItem>
            <ItemIn onClick={() => renderComponent(<ManageProduct />)}>
              Manage Product
            </ItemIn>
            <ItemIn onClick={() => renderComponent(<ManageStaff />)}>
              Manage Staff
            </ItemIn>
          </DashboardItem>
        </Offcanvas.Body>
      </Offcanvas>
      <InsideDashboard>
        {!selectedComponent && <h1 style={{ padding: "1%" }}>Dashboard</h1>}
        {selectedComponent}
      </InsideDashboard>
    </Container>
  );
}

export default Example;
