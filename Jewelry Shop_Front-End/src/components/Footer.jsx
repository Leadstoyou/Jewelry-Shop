import React, { useEffect } from "react";
import styled from "styled-components";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import Aos from "aos";
import "aos/dist/aos.css";
import footerVideo from "../assets/footer.mp4";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
const Container = styled.div`
  
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  font-weight: 500;
  gap: 10px;
 
`;

const Left = styled.div`
  margin-left: 10px;
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
  z-index: 3;
  color: black;

  border-radius: 20%;
  mix-blend-mode: darken;
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
  z-index: 3;
  color: black;

  border-radius: 20%;
`;

const Title = styled.h3`
  margin-bottom: 30px;
`;
const List = styled.ul`
  padding: 10px;
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
  cursor: pointer;
  display: flex;
  justify-content: start;
  align-items: center;
  &:hover {
    text-decoration: underline teal;
    transition: 0.5s ease;
    transform: translateX(5px);
  }
`;

const Right = styled.div`
  flex: 1;
  z-index: 3;

  color: black;

  border-radius: 10%;
`;

const Logo = styled.h1``;
const DESC = styled.div`
  margin: 20px 0px;
  font-weight: 500;
`;
const SocialContainer = styled.div`
  display: flex;
`;
const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  cursor: pointer;
`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-self: center;
  cursor: pointer;
  &:hover {
    text-decoration: underline teal;
    transform: translateX(10px);
  }
`;

const VideoUpdate = styled.video`
  height: 100%;
  width: 100%;
  position: absolute;
  object-fit: cover;
  top: 0;
  left: 0;
  opacity: 0.8;
`;

const ContentAll = styled.div`
  margin: 50px;
  display: flex;
  background-color: white;
  z-index: 5;
  opacity: 0.8;
  border-radius: 20px;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: grey;
  z-index: 3;
  opacity: 0.6;
`;

const Footer = () => {

  return (
    <Container
      
      style={{ backgroundColor: "teal", zIndex: 15 }}
    >
      <Overlay></Overlay>
      <VideoUpdate muted autoPlay loop>
        <source src={footerVideo} />
      </VideoUpdate>
      <ContentAll>
        <Left>
          <Logo>Jewelry</Logo>
          <DESC>Thăng hoa vẻ đẹp với trang sức.</DESC>
          <SocialContainer>
            <SocialIcon>
              <FacebookOutlinedIcon />
            </SocialIcon>
            <SocialIcon>
              <YouTubeIcon />
            </SocialIcon>
            <SocialIcon>
              <TwitterIcon />
            </SocialIcon>
            <SocialIcon>
              <InstagramIcon />
            </SocialIcon>
            <SocialIcon>
              <PinterestIcon />
            </SocialIcon>
          </SocialContainer>
        </Left>
        <Center>
          <Title>ĐIỀU KHOẢN & DỊCH VỤ</Title>
          <List>
            <ListItem>
              <ArrowRightIcon />
              Câu hỏi thường gặp
            </ListItem>
            <ListItem>
              <ArrowRightIcon />
              Chính sách bảo mật
            </ListItem>
            <ListItem>
              <ArrowRightIcon />
              Chính sách thanh toán
            </ListItem>
            <ListItem>
              <ArrowRightIcon />
              Chính sách giao nhận
            </ListItem>
            <ListItem>
              <ArrowRightIcon />
              Chính sách đổi hàng
            </ListItem>
            <ListItem>
              <ArrowRightIcon />
              Cách thức bảo quản
            </ListItem>
          </List>
        </Center>
        <Right style={{marginTop : "15px"}}>
          <Title>GIAO HÀNG</Title>
          <ContactItem>
            <LocalShippingIcon/> Nhất Tín Logistics
          </ContactItem>
          <ContactItem>
            <LocalShippingIcon /> VNPost
          </ContactItem>
        </Right>
      
      </ContentAll>
    </Container>
  );
};

export default Footer;
