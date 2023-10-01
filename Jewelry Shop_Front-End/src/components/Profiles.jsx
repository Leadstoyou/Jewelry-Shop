import React, { useState } from "react";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import "../style/Profile.scss";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { TextFields } from "@mui/icons-material";
const Profile = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleImageUpload = (e) => {
    const selectedImage = e.target.files[0];
    setImage(URL.createObjectURL(selectedImage));
  };

  const handleChangePassword = () => {
    // Xử lý việc đổi mật khẩu ở đây
    console.log("Changing password...");
  };
  return (
    <Container style={{ marginTop: "100px" }}>
      <div className="all_information">
        <h1>Thông tin cá nhân</h1>
        <div className="avatar">
          <Avatar src={image} sx={{ width: 160, height: 160 }} />
          <input
            type="file"
            onChange={handleImageUpload}
            id="upload"
            style={{ display: "none" }}
          />
          <Button
            style={{ marginLeft: "20px" }}
            htmlFor="upload"
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
          >
            Upload file
          </Button>
        </div>
        <div className="information">
          <TextField
            className="text"
            label="Tên"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            className="text"
            label="Số điện thoại"
            variant="outlined"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <TextField
            className="text"
            label="Tuổi"
            variant="outlined"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <TextField
            className="text"
            label="Địa chỉ"
            variant="outlined"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <TextField
            className="text"
            label="Giới tính"
            variant="outlined"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          />
        </div>
        <Button variant="contained" color="primary">
          Lưu thông tin
        </Button>
      </div>
      <hr></hr>
      <div className="change_password">
        <h1>Thay đổi mật khẩu</h1>
        <TextField
          className="text"
          label="Current Password"
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
        <TextField
          className="text"
          label="New Password"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <TextField
          className="text"
          label="New Password Again"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>
      <Button
        style={{margin: "  0px 30px"}}
        variant="contained"
        color="primary"
        onClick={handleChangePassword}
      >
        Change Password
      </Button>
    </Container>
  );
};

export default Profile;
