import React, { useState } from "react";
import { ToastContainer,toast} from 'react-toastify';
import { Link,useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import "../style/ForgotPassword.scss";
import axios from "axios";




const ForgotPasswords = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      try {
        const response = await axios.get(`http://localhost:9999/api/v1/users/forgotPassword?userEmail=${email}` );
        if (response.status === 200) {
          toast(" Success"); 
          navigate('/newpass')
          
        } else {
          toast.error("Login failed");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }
  };

  const validate = () => {
    

    if (email === "" || email === null || !email.includes("@")) {
      toast.error('Email is required');
      return false;
    }
    return true;
  };

  return (
    
    <div className="containers">

      <div className="header-page">
        <h1>Quên Mật Khẩu</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div >
          <input
          className="email"
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
    </div>
    );
}

export default ForgotPasswords;