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
        const response = await axios.get(`http://localhost:9999/api/v1/account/forgotPassword?userEmail=${email}` );
        if (response.status === 200) {
          toast(" Check your email to take OTP"); 
          setTimeout(()=>{
          navigate('/newpass')
          },1500)
          
          
        } 
      } catch (error) {
        toast.error(error.response.data.message);

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
      <ToastContainer position="top-right" autoClose="1000" />

    </div>
    );
}

export default ForgotPasswords;