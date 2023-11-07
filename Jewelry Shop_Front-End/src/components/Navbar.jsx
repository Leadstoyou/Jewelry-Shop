import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import DashboardIcon from "@mui/icons-material/Dashboard";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InventoryIcon from "@mui/icons-material/Inventory";
import videoFile from "../assets/video.mp4"; // Import the video file using ES6 module syntax
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getNumber } from "../redux/GetNumber.jsx";
import { cartValue } from "../App";
import { Logout } from "../services/connectApi.js";
const Container = styled.div`
  font-family: "Jost", sans-serif;
  background-color: #d5d3d3;
  position: relative;
  height: 70px;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 5vw;
  padding-right: 5vw;
  box-sizing: border-box;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
  z-index: 50;
`;
const Logo = styled.h1``;

const ControllerLogo = styled.div`
  cursor: pointer;
  z-index: 100;
`;
const Right = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3vw;
  box-sizing: border-box;
`;
const InputController = styled.div`
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #e3dede;
  box-sizing: border-box;
  z-index: 100;
`;
const ItemController = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Item = styled.div`
  padding: 10px;
  box-sizing: border-box;
  cursor: pointer;
  margin-right: 2vw;
  box-sizing: border-box;
  &:hover {
    background-color: #bfbbbb;
    border-radius: 5px;
  }
  z-index: 100;
`;
const Input = styled.input`
  border: none;
  outline: none;
  padding: 6px;
  box-sizing: border-box;
`;

const Video = styled.video`
  position: absolute;
  height: 70px;
  /* background-color: #cfcdcd; */
  width: 100vw;

  top: 0;
  left: 50%;
  transform: translate(-50%);
  mix-blend-mode: darken;
  object-fit: cover;
  opacity: 1;
  z-index: 2;
  box-sizing: border-box;
`;

const Icon = styled.span`
  &:hover {
    width: 100%;
    height: 100%;
    opacity: 0.5;
  }
`;

const Span = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: start;
  background-color: white;
  &:hover {
    background-color: #c2c1c1;
  }
`;

const Nav = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  background-color: white;
  z-index: 2;
`;

const Button = styled.button`
  background-color: #333232;
  color: white;
  border: none;
  padding: 5px;
  padding-left: 10px;
  padding-right: 10px;
  cursor: pointer;
  &:hover {
    background-color: black;
  }
  z-index: 2;
`;

const Navbar = (props) => {
  const { changeInitial, txt, setTxt } = useContext(cartValue);
  const dispatch = useDispatch();
  const numberCart = useSelector((state) => state?.getNumber?.value);
  const user = useSelector((state) => state?.loginController);
  const [showContent, setShowContent] = useState(false);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const toggleContent = () => {
    setShowContent(!showContent);
  };
  const handleLogout = () => {
    toggleContent();
    changeInitial();
    Logout();

    dispatch(getNumber(0));
    navigate("/");
  };

  // Function to handle Enter key press
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      if (searchQuery.trim() === "") {
        toast.error("Please enter a search");
      } else {
        navigate(`/search/${searchQuery.trim()}`);
      }
    }
  };
  const handleSubmit = () => {
    if (searchQuery.trim() === "") {
      toast.error("Please enter a search");
    } else {
      navigate(`/search/${searchQuery}`);
    }
  };
  const handleProfile = () => {
    toggleContent();
    navigate("/profile");
  };
  return (
    <Nav>
      <Container>
        <Video src={videoFile} muted autoPlay loop></Video>
        <ControllerLogo onClick={() => navigate("/")}>
          <Logo>Jewelry</Logo>
        </ControllerLogo>
        <Right>
          <InputController>
            <Icon>
              <SearchIcon
                onClick={handleSubmit}
                style={{
                  color: "black",
                  backgroundColor: "white",
                  cursor: "pointer",
                  padding: "4px",
                }}
              />
            </Icon>
            <Input
              placeholder="Tìm sản phẩm ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyPress}
            />
          </InputController>
          <ItemController>
            <Item>
              <a
                style={{ color: "black" }}
                href="https://www.google.com/maps/place/Tr%C6%B0%E1%BB%9Dng+%C4%90%E1%BA%A1i+H%E1%BB%8Dc+FPT/@21.0130252,105.5239285,17z/data=!3m1!4b1!4m6!3m5!1s0x3135abc60e7d3f19:0x2be9d7d0b5abcbf4!8m2!3d21.0130202!4d105.5265034!16s%2Fm%2F02rsytm?hl=vi&entry=ttu"
                target="_blank"
              >
                <LocationOnIcon />
              </a>
            </Item>

            <Item onClick={() => navigate("/cart")}>
              <Badge badgeContent={numberCart} color="primary">
                <ShoppingCartIcon />
              </Badge>
            </Item>
            <div
              style={{
                width: "150px",
                height: "100px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
                cursor: "pointer",
                zIndex: "2",
              }}
            >
              {Object.keys(user).length === 0 || user?.value === undefined ? (
                <div onClick={() => navigate("/login")}>
                  <Button style={{ marginLeft: "auto", marginRight: "auto" }}>
                    SIGN IN
                  </Button>
                </div>
              ) : (
                <>
                  {user?.value?.userRole === 0 ||
                  user?.value?.userRole === 1 
                  ? (
                    <>
                      <Item
                        onClick={() => navigate("/dashboard")}
                        style={{ marginRight: "0" }}
                      >
                        <DashboardIcon />
                      </Item>
                    </>
                  ) : null}
                  <div
                    style={{
                      position: "relative",
                      width: "40%",
                      height: "50%",
                      marginLeft: "15%",
                    }}
                  >
                    <img
                      src={user?.value?.userAvatar}
                      width="100%" // Adjust the width as needed
                      height="100%" // Adjust the height as needed
                      style={{
                        borderRadius: "50%",
                        cursor: "pointer",
                      }}
                      onClick={toggleContent}
                    />
                    {showContent && (
                      <div
                        style={{
                          position: "absolute",
                          top: "100%", // Content will appear directly below the image
                          right: 0, // Adjust the left position if needed
                          backgroundColor: "white",
                          border: "1px solid #ccc",
                          padding: "10px",
                          boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
                          width: "150px",
                        }}
                      >
                        <Span onClick={handleProfile}>
                          <AccountBoxIcon style={{ color: "blue" }} />
                          Profile
                        </Span>
                        <hr />
                        <Span onClick={() => navigate("/order")}>
                          <InventoryIcon style={{ color: "green" }} />
                          Order
                        </Span>
                        <hr />
                        <Span onClick={handleLogout}>
                          <LogoutIcon style={{ color: "red" }} />
                          Log out
                        </Span>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </ItemController>
        </Right>
      </Container>
    </Nav>
  );
};

export default Navbar;
