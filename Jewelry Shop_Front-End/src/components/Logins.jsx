import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../style/Login.scss";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const Logins = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      try {
        
        const response = await axios.get("http://localhost:3001/Account", {
          email: email,
          password: password,
        });

        if (response.status === 200) {
          console.log("Login successful");
          navigate("/"); 
        } else {
          toast.error("Login failed");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }
  };

  const validate = () => {
    const passwordRegex = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/;

    if (email === "" || email === null || !email.includes("@")) {
      toast.error('Email is required');
      return false;
    }

    if (password === "" || password === null) {
      toast.error("Please enter a password");
      return false;
    }

    if (!password.match(passwordRegex)) {
      toast.error("Password must contain at least one number and one letter.");
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
        <div >
          <input
          className="email"
            type="text"
            placeholder="Email"
            size={30}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div >
          <input
            className="password"
            type="password"
            size={30}
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="note">
          <span>
            <Link to="/">Quên mật khẩu</Link>
          </span>
          ?
          <span>
            <Link to="/register">Đăng kí</Link>
          </span>
        </div>
        <div className="action_button">
          <input type="submit" value={"Đăng Nhập"} className="btn" />
        </div>
        <ToastContainer position="top-right"  autoClose ='1000' /> 
      </form>
    </div>
  );
};

export default Logins;
