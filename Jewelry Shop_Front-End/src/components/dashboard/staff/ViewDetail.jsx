import React, { useState,useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

const ViewDetail = (props) => {
  const [user, setUser] = useState("");
  const [calledApi, setCalledApi] = useState(false);
  const userID = props.userIds;
  const ViewProfileDetail = () => {
    console.log(userID);
    axios
      .get(
        `http://localhost:9999/api/v1/users/viewProfileDetail?userId=${userID}`
      )
      .then((response) => {
        if (response.status === 200) {
          console.log("Successfully");
          console.log(response.data.data.userName);
          setUser(response.data.data);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };


  const handleModalHide = () => {
    setCalledApi(false);
    props.onHide();
  };
  useEffect(() => {
    if (props.show && !calledApi) {
      ViewProfileDetail();
      setCalledApi(true);
    }
  }, [props.show, calledApi]);
  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      style={{ width: "max-width" }}
    >
      <Modal.Header >
        <Modal.Title id="contained-modal-title-vcenter">
          View Detail User
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="grid-esxample">
        <div className="all">
          <img
            src={user.userAvatar}
            style={{
              borderRadius: "50%",
              width: "150px",
              height: "150px",
              justifyContent: "center",
            }}
          />
          <div className="information">
            <div className="information_detail1">
              <div className="column" style={{ marginRight: "20px" }}>
                <h5>Tên</h5>
                <input className="Name" type="text" value={user.userName} disabled />
              </div>
              <div className="column">
                <h5>Số điện thoại</h5>
                <input
                  className="phoneNumber"
                  type="text"
                  value={user.userPhoneNumber}
                  disabled
                />
              </div>
            </div>

            <div className="information_detail1">
              <div className="column" style={{ marginRight: "20px" }}>
                <h5>Tuổi</h5>
                <input className="age" type="text" value={user.userAge} disabled />
              </div>
              <div className="column">
                <h5>Địa chỉ</h5>
                <input
                  className="address"
                  type="text"
                  value={user.userAddress}
                  disabled
                />
              </div>
            </div>
            <div className="information_detail1">
              <div className="column" style={{ marginRight: "20px" }}>
                <h5>Giới tính</h5>
                <input className="Name" type="text" value={user.userGender} disabled />
              </div>
              <div className="column">
                <h5>Email</h5>
                <input className="Email" type="text" value={user.userEmail} disabled />
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          style={{
            width: "80px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "40px",
          }}
          onClick={handleModalHide}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewDetail;
