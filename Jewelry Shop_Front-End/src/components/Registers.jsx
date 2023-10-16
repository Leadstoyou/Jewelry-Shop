import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../style/Register.scss";


import {
  Container,
  Typography,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
  Box,
} from "@mui/material";
const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    gender: "Male",
    phoneNumber: "",
    address: "",
    age: "",
    email: "",
    password: "",
    checkpassword: "",
  });
  const navigate = useNavigate();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (validate()) {
      try {
        console.log("ok");
       const response = await axios.post("http://localhost:9999/api/v1/users/register", {
          userName:formData.fullName,
          userEmail:formData.email,
          userPassword:formData.password,
          confirmPassword:formData.checkpassword,
          userPhoneNumber:formData.phoneNumber,
          userGender:formData.gender,
          userAddress:formData.address,
          userAge:formData.age
       
        });

        if (response.status === 201) {
          console.log("Registration successful");
          navigate("/login"); 
          
        } else {
          console.log("check");
          toast.error("Registration failed");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }
  };

  const validate = () => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
    if (
      formData.fullName === "" ||
      formData.age === "" || 
      formData.phoneNumber===""||
      formData.address===""
    ) {
      toast.error("Not empty ");
      return false;
    }
    if (
      formData.email === "" ||
      formData.email === null ||
      !formData.email.includes("@")
    ) {
      toast.error("Please enter a valid email");
      return false;
    }

    if (
      formData.password === "" ||
      formData.password === null ||
      !formData.password.match(passwordRegex)
    ) {
      toast.error(
        "Password must contain at least one lowercase letter, one uppercase letter, one number, and be at least 8 characters long."
      );
      return false;
    }

    if (formData.password !== formData.checkpassword) {
      toast.error("Passwords do not match");
      return false;
    }

    return true;
  };

  return (
    <Container maxWidth="sm" className="container">
      <Typography variant="h3" align="center" gutterBottom>
        Đăng ký
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Họ và Tên"
          variant="outlined"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          margin="normal"
        />
      <Box display="flex" alignItems="center" justifyContent="start" flexDirection="row">
  <Typography variant="subtitle1" gutterBottom>
    Giới tính:
  </Typography>
  <RadioGroup
    name="gender"
    value={formData.gender}
    onChange={handleChange}
    row
  >
    <FormControlLabel value="Male" control={<Radio />} label="Nam" />
    <FormControlLabel value="Female" control={<Radio />} label="Nữ" />
  </RadioGroup>
</Box> 

        <TextField
          fullWidth
          label="Số điện thoại"
          variant="outlined"
          inputProps={{
            type: 'number', 
            maxLength: 10,  
          }}
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Tuổi"
          variant="outlined"
          name="age"
          inputProps={{
            type: 'number', 
            maxLength: 2,  
          }}
          value={formData.age}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Địa chỉ"
          variant="outlined"
          name="address"
          value={formData.address}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Mật khẩu"
          variant="outlined"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label=" Nhập Lại Mật khẩu"
          variant="outlined"
          type="password"
          name="checkpassword"
          value={formData.checkpassword}
          onChange={handleChange}
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Đăng Ký
        </Button>
      {/* <ToastContainer position="top-right" autoClose="1000" /> */}

      </form>
    </Container>
  );
};

export default Register;
