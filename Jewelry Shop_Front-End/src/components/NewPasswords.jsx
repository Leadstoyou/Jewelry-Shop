import React, { useState } from "react";
import { ToastContainer,toast} from 'react-toastify';
import { Link } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";
const NewPasswords = () => {
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [token, setToken] = useState('');
const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
    
      
          try {
            const response = await axios.put(`http://localhost:9999/api/v1/users/resetPassword`,{
              newPassword:password,
              userPasswordResetToken:token,
            });
            if (response.status === 200) {
              toast(" Success"); 
              navigate("/login")
              
            } else {
              toast.error("Login failed");
            }
          } catch (error) {
            console.error("An error occurred:", error);
          }
        
      };
  return (
    <div className="containers">

    <div className="header-page">
      <h1>Mật khẩu mới</h1>
    </div>
    <form onSubmit={handleSubmit}>
      <div >
        <input
        className="email"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
          <input
        className="email"
          type="text"
          placeholder="Password again"
          value={checkPassword}
          onChange={(e) => setCheckPassword(e.target.value)}
        />
        <br />
          <input
        className="email"
          type="password"
          placeholder="Token to check password"
          value={token}
          onChange={(e) => setToken(e.target.value)}
        />
      </div>
      <div className="note">
        <span>
          <Link to="/login">Đăng nhập</Link>
        </span>
        </div>
      <div className="action_button">
        <input type="submit" value={"Xác nhận"} className="btn" />
      </div>
    </form>
    <ToastContainer position="top-right" autoClose={1000} />

  </div>
  )
}

export default NewPasswords