import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import RiseLoader from "react-spinners/RiseLoader";
import Offcanvas from "react-bootstrap/Offcanvas";
import styled from "styled-components";
import Menu from "@mui/icons-material/Menu";
import ManageProduct from "../components/dashboard/product/ManageProduct.jsx";
import ManageStaff from "../components/dashboard/staff/ManageStaff.jsx";
import DiamondIcon from "@mui/icons-material/Diamond";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import jewelry from "../assets/jewelry.mp4";
import Statistics from "./Statistics.jsx";
import { useSelector } from "react-redux";

const Container = styled.div`
  font-family: "Jost", sans-serif;
  height: 100vh;
  position: relative;
`;

const VideoUpdate = styled.video`
  width: 100%;
  position: absolute;
  object-fit: cover;
  top: 0;
  left: 0;
  opacity: 1;
  z-index: -1;
`;
const ControlHome = styled.div`
  position: absolute;
  top: 0%;
  left: 5%;
`;
const SidebarContainer = styled.div`
  position: fixed;
  height: 100vh;
  width: 4%;
  background-color: #a4a1a1;
  z-index: 1;
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
  margin-bottom: 15px;
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
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state) => state?.loginController);
  const [show, setShow] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState(null);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const handleClose = () => {
    setShow(false);
    setSelectedComponent(null);
  };

  const handleShow = () => setShow(true);

  const renderComponent = (component) => {
    handleClose();
    setSelectedComponent(component);
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
      <ControlHome onClick={() => navigate("/")}>
        <button
          style={{
            backgroundColor: "#c6c2c2",
            border: "none ",
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
            gap: "5px",
          }}
        >
          <span>
            <HomeIcon />
          </span>
          <span style={{ marginTop: "2px" }}>Back to home</span>
        </button>
      </ControlHome>
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
          <Offcanvas.Title>
            <DiamondIcon />
            Jewelry
            <DiamondIcon />
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <DashboardItem>
            <ItemIn onClick={() => renderComponent(<ManageProduct />)}>
              Manage Product
            </ItemIn>
            {user?.value?.userRole === 0 && (
              <>
                <ItemIn onClick={() => renderComponent(<ManageStaff />)}>
                  Manage Account
                </ItemIn>
                <ItemIn onClick={() => renderComponent(<Statistics />)}>
                  Statistics
                </ItemIn>
              </>
            )}
          </DashboardItem>
        </Offcanvas.Body>
      </Offcanvas>
      <InsideDashboard>
        {!selectedComponent && (
          <>
            <VideoUpdate muted autoPlay loop>
              <source src={jewelry} />
            </VideoUpdate>
            <div
              style={{
                position: "absolute",
                bottom: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)", // Center both horizontally and vertically
              }}
            >
              <h1 style={{ color: "white", fontSize: "50px" }}>
                Welcome Back To Dashboard
              </h1>
            </div>
          </>
        )}
        {selectedComponent}
      </InsideDashboard>
    </Container>
  )}
  </>
);
}

export default Dashboard;
