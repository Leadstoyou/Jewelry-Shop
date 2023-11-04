import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import styled from "styled-components";
import Menu from "@mui/icons-material/Menu";
import ManageProduct from '../components/dashboard/product/ManageProduct.jsx'
import ManageStaff from '../components/dashboard/staff/ManageStaff.jsx'
import DiamondIcon from '@mui/icons-material/Diamond';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from "react-router-dom";
import Statistics from "./Statistics.jsx";
  
const Container = styled.div`
  height: 1000px;
  position: relative;
`;
const ControlHome = styled.div`
  position: absolute;
  top: 0%;
  left: 5%;

`
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

function Dashboard() {
  const navigate = useNavigate()
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
      <ControlHome onClick={()=>navigate('/')}><button style={{backgroundColor:'#c6c2c2',border:'none '}}><HomeIcon/>Back to home</button></ControlHome>
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
          <Offcanvas.Title><DiamondIcon />Jewelry<DiamondIcon /></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <DashboardItem>
            <ItemIn onClick={() => renderComponent(<ManageProduct />)}>
              Manage Product
            </ItemIn>
            <ItemIn onClick={() => renderComponent(<ManageStaff />)}>
              Manage Staff
            </ItemIn>
            <ItemIn onClick={() => renderComponent(<Statistics />)}>
              Statistics
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

export default Dashboard;
