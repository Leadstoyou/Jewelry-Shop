import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/Login.css";
import axios from "axios";

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
       
          console.error("Login failed");
        }
      } catch (error) {
        
        console.error("An error occurred:", error);
      }
    }
  };

  const validate = () => {
    
    const passwordRegex = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/;

    if (email === "" || email === null ||!email.includes("@")) {
      alert("Email is required");
      return false;
    }

    if (password === "" || password === null) {
      alert("Please enter a password");
      return false;
    }

    if (!password.match(passwordRegex)) {
      alert("Password must contain at least one number and one letter.");
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
        <div className="email">
          <input
            required
            type="text"
            placeholder="Email"
            size={30}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="password">
          <input
            required
            type="password"
            size={30}
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="note">
          <a href="http://localhost:5173">
            <span>Quên mật khẩu</span>{" "}
          </a>
          ? hoặc
          <a href="http://localhost:5173/register">
            <span>Đăng kí</span>{" "}
          </a>
        </div>
        <div className="action_button">
          <input type="submit" value={"Đăng Nhập"} className="btn" />
        </div>
      </form>
    </div>
  );
};

export default Logins;
