import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../style/Login.scss";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { login } from "../redux/Login.jsx";
import { getNumber } from "../redux/GetNumber.jsx";
import { cartValue } from "../App.jsx";
import { viewCartAPI } from "../services/connectApi.js";
const Logins = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    const savedPassword = localStorage.getItem("password");

    if (savedEmail) {
      setEmail(savedEmail);
    }

    if (savedPassword) {
      setPassword(savedPassword);
    }
  }, []);

  const [dataCart, setcartData] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      try {
        const response = await axios.post(
          "http://localhost:9999/api/v1/account/login",
          {
            userEmail: email,
            userPassword: password,
          },
          {
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          console.log("Login successful");
          
          await dispatch(getNumber(dataCart?.productList?.length));
          await dispatch(login(response?.data?.data));
          navigate("/");
        
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };

  const validate = () => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (email === "" || email === null || !email.includes("@")) {
      toast.error("Email is required");
      return false;
    }

    if (password === "" || password === null) {
      toast.error("Please enter a password");
      return false;
    }

    if (!password.match(passwordRegex)) {
      toast.error(
        "Password must contain at least one lowercase letter, one uppercase letter, one number, and be at least 8 characters long."
      );
      return false;
    }

    return true;
  };

  return (
    <div className="containers">
      <img style={{width:"100px",height:"50px",marginLeft:"110px",marginBottom:"10px"}} src="https://scontent.fsgn2-11.fna.fbcdn.net/v/t1.15752-9/363545588_642060478122697_1685312086456599481_n.png?_nc_cat=105&ccb=1-7&_nc_sid=8cd0a2&_nc_eui2=AeEcGKfCuOv6Yx5vlB-pd7JUBMTv73JrKm8ExO_vcmsqbzVunpviXuiiPAdSnQ1H0eTDFpLgj7wvhX2y3oAqBcrt&_nc_ohc=REGgVRYgRnoAX-vtgB-&_nc_ht=scontent.fsgn2-11.fna&oh=03_AdRWQ1yaonMyD3Jk9N-9DFsQsTzX7ImRcnrdP0WK7-JKPA&oe=6571B1F1"/>
      <div className="header-page">
        <h1>Đăng nhập</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            className="email"
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <input
            className="password"
            type="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="note">
          <span>
            <Link to="/forgot">Quên mật khẩu</Link>
          </span>
          ?
          <span style={{marginLeft:"10px"}}>
            <Link to="/register">Đăng kí</Link>
          </span>
        </div>
        <div className="action_button">
          <input type="submit" value={"Đăng Nhập"} className="btn" />
        </div>
      </form>
      <ToastContainer position="top-right" autoClose="1000" />

    </div>
  );
};

export default Logins;
