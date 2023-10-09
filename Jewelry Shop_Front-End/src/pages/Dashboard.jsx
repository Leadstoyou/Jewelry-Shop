import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import styled from "styled-components";
import Menu from "@mui/icons-material/Menu";
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
function Dashboard() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
            <ItemIn onClick={() => setBody("ManageProduct")}>
              Manage Product
            </ItemIn>
            <ItemIn onClick={() => setBody("ManageStaff")}>Manage Staff</ItemIn>
          </DashboardItem>
        </Offcanvas.Body>
      </Offcanvas>
      <InsideDashboard>
        <Title>Dashboard</Title>
        {}
      </InsideDashboard>
    </Container>
  );
}

export default Dashboard;
