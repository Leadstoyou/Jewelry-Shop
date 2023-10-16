import React, { useState } from "react";
import { ToastContainer,toast} from 'react-toastify';
import { Link } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import "../style/ForgotPassword.scss";



const ForgotPasswords = () => {
  const [email, setEmail] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      try {
        
        const response = await axios.post("http://localhost:3001/Account", {
          email: email,
        });

        if (response.status === 200) {
          toast(" Success");
          
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
        {/* <ToastContainer position="top-right"  autoClose ='1000' />  */}
      </form>
    </div>
    );
}

export default ForgotPasswords;