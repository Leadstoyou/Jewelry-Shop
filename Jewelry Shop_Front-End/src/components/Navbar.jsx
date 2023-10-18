import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import videoFile from "../assets/video.mp4"; // Import the video file using ES6 module syntax
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
const Container = styled.div`
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
const Nav = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  background-color: white;
  z-index: 2;
`;
const Navbar = (props) => {
  const numberCart = useSelector((state) => state?.getNumber?.value);

  const notify = () => {
    toast.error("Vui lòng không để trống trường tìm kiếm !!!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };
  const navigate = useNavigate();
  // const [searchText , setSearchText] = useState("")
  const [searchQuery, setSearchQuery] = useState("");

  // Function to handle Enter key press
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      if (searchQuery.trim() === "") {
        notify();
      } else {
        navigate(`/search/${searchQuery.trim()}`);
      }
    }
  };
  const handleSubmit = () => {
    if (searchQuery.trim() === "") {
      notify();
    } else {
      navigate(`/search/${searchQuery}`);
    }
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
              <LocationOnIcon />
            </Item>
            <Item>
              <PersonIcon />
            </Item>
            <Item onClick={() => navigate("/cart")}>
              <Badge
                badgeContent={numberCart}
                color="primary"
              >
                <ShoppingCartIcon />
              </Badge>
            </Item>
          </ItemController>
        </Right>
      </Container>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Nav>
  );
};

export default Navbar;
