import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../style/Login.scss";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import {login} from '../redux/Login.jsx'
const Logins = () => {
  const dispatch = useDispatch()
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      try {
        const response = await axios.post("http://localhost:9999/api/v1/users/login", {
          userEmail: email,
          userPassword: password,
        },{
          withCredentials: true,
        });
        if (response.status === 200) {
          dispatch(login(response?.data?.data))
          console.log(response);
          console.log("Login successful");
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
          <span>
            <Link to="/register">Đăng kí</Link>
          </span>
        </div>
        <div className="action_button">
          <input type="submit" value={"Đăng Nhập"} className="btn" />
        </div>
      </form>
    </div>
  );
};

export default Logins;
