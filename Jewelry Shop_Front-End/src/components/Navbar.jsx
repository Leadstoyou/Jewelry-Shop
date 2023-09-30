import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import React from "react";
import videoFile from "../assets/video.mp4"; // Import the video file using ES6 module syntax
const Container = styled.div`
  position: relative;
  height: 70px;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 5vw;
  padding-right: 5vw;
  box-sizing: border-box;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0);
  z-index: 5;
`;
const Logo = styled.h1``;
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
    background-color: red;
    opacity: 0.5;
  }
`;
const Nav = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  background-color: white;
  z-index: 1;
`;
const Navbar = () => {
  return (
    <Nav>
      <Container>
        <Logo>Jewelry</Logo>
        <Right>
          <InputController>
            <Icon>
              <SearchIcon
                style={{
                  color: "black",
                  backgroundColor: "white",
                  cursor: "pointer",
                  padding: "6px",
                }}
              />
            </Icon>
            <Input placeholder="Tìm sản phẩm ..." />
          </InputController>
          <ItemController>
            <Item>
              <LocationOnIcon />
            </Item>
            <Item>
              <PersonIcon />
            </Item>
            <Item>
              <Badge badgeContent={1} color="primary">
                <ShoppingCartIcon />
              </Badge>
            </Item>
          </ItemController>
        </Right>
      </Container>
    </Nav>
  );
};

export default Navbar;
