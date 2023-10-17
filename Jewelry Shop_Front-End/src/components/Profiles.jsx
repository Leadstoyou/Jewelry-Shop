import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import "../style/Profile.scss";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const Profile = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("Male");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [calledApi, setCalledApi] = useState(false);

  // Hàm để lấy giá trị từ một cookie theo tên
  function getCookieValue(cookieName) {
    const cookies = document.cookie.split("; ");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].split("=");
      if (cookie[0] === cookieName) {
        return decodeURIComponent(cookie[1]);
      }
    }
    return null;
  }

  const accessToken = getCookieValue("accessToken");

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  if (accessToken) {
    
    useEffect(() => {
      if (!calledApi) {
        axios
          .get("http://localhost:9999/api/v1/users/viewProfile", axiosConfig)
          .then((response) => {
            if (response.status === 200) {
              const userData = response.data.data;
              console.log("Yêu cầu thành công");
              const {
                userName,
                userAvatar,
                userEmail,
                userGender,
                userAddress,
                userPhoneNumber,
                userAge,
              } = userData;
              setName(userName);
              setEmail(userEmail);
              setGender(userGender);
              setAddress(userAddress);
              setPhone(userPhoneNumber);
              setAge(userAge);
              setImage(userAvatar);
            } else {
              console.log("Yêu cầu thất bại");
            }
          })
          .catch((error) => {
            console.error("Lỗi:", error);
          });

        setCalledApi(true);
      }
    });
  } else {
    console.log("Không tìm thấy access token trong cookie.");
  }

  const handleImageUpload = (e) => {
    const selectedImage = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const imageUrl = reader.result; // Access result after the file is read
      setImage(imageUrl);
      console.log(imageUrl);
    };

    reader.readAsDataURL(selectedImage);
  };

  const handleSaveInformation = async (e) => {
   
    e.preventDefault();
    console.log("123");
    try {
      const response = await axios.put(
        "http://localhost:9999/api/v1/users/updateProfile",
        {
          userName: name,
          userGender: gender,
          userPhoneNumber: phone,
          userAddress: address,
          userAge: age,
          userAvatar: image,
        },
        axiosConfig
      );

      if (response.status === 200) {
        console.log("Save successful");
      } else {
        console.log("Registration failed");
      }
    } catch (error) {
      console.log();
      error;
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    const isValid = validation();

    if (isValid) {
      try {
        const response = await axios.post("http://localhost:3001/Account", {
          password: currentPassword,
          newPassword: newPassword,
        });

        if (response.status === 200) {
          console.log("Save successful");
        } else {
          console.log("Save failed");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }
  };
  const validation = () => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (
      currentPassword === "" ||
      currentPassword === null ||
      !currentPassword.match(passwordRegex)
    ) {
      toast(
        "Current password must contain at least one lowercase letter, one uppercase letter, one number, and be at least 8 characters long."
      );
      return false;
    }

    if (
      newPassword === "" ||
      newPassword === null ||
      !newPassword.match(passwordRegex)
    ) {
      toast(
        "New password must contain at least one lowercase letter, one uppercase letter, one number, and be at least 8 characters long."
      );
      return false;
    }

    if (currentPassword !== checkPassword) {
      toast("New password should be different from the current password");
      return false;
    }

    return true;
  };

  return (
    <Container style={{ marginTop: "100px", marginBottom: "30px" }}>
      <div className="all_information">
        <h1>Thông tin cá nhân</h1>
        <div className="avatar">
          <Avatar src={image} sx={{ width: 160, height: 160 }} id="output" />
          <input
            type="file"
            onChange={handleImageUpload}
            id="img"
            style={{ display: "none" }}
          />
          <Button
            style={{ marginLeft: "20px" }}
            htmlFor="img"
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
          >
            Tải lên
          </Button>
        </div>
        <div className="information">
          <div className="information_detail1">
            <TextField
              className="text"
              label="Tên"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <div className="radio">
              <span>Giới tính:</span>
              <label htmlFor="radio1">
                <input
                  type="radio"
                  id="radio1"
                  value="nam"
                  checked={gender === "Male"} // Check if 'gender' matches the value
                  onChange={(e) => setGender(e.target.value)}
                />
                Nam
              </label>
              <label htmlFor="radio2">
                <input
                  type="radio"
                  id="radio2"
                  value="nu"
                  checked={gender === "Female"} // Check if 'gender' matches the value
                  onChange={(e) => setGender(e.target.value)}
                />
                Nữ
              </label>
            </div>
          </div>
          <div className="information_detail">
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
          </div>
          <div className="information_detail">
            <TextField
              className="text"
              label="Địa chỉ"
              variant="outlined"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <TextField
              className="text"
              label="Email"
              variant="outlined"
              value={email}
              disabled
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSaveInformation}
        >
          Lưu thông tin
        </Button>
      </div>

      <hr></hr>
      <form>
        <div className="change_password">
          <h1>Thay đổi mật khẩu</h1>
          <TextField
            className="text"
            label="Mật khẩu hiện tại"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <TextField
            className="text"
            label="Mật khẩu mới"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <TextField
            className="text"
            label="Mật khẩu mới"
            type="password"
            value={checkPassword}
            onChange={(e) => setCheckPassword(e.target.value)}
          />
        </div>
        <Button
          style={{ margin: "  0px 30px" }}
          variant="contained"
          color="primary"
          onClick={handleChangePassword}
        >
          Lưu mật khẩu
        </Button>
      </form>
    </Container>
  );
};

export default Profile;
