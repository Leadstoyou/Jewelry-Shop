import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal"
import TextField from "@mui/material/TextField";;
import Row from "react-bootstrap/Row";
const ViewDetail = (props) => {
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" style={{width:'max-width'}}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          View Detail User
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="grid-esxample">
        <div className="all">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/b/b4/Lionel-Messi-Argentina-2022-FIFA-World-Cup_%28cropped%29.jpg"
            style={{
              borderRadius: "50%",
              width: "150px",
              height: "150px",
              justifyContent: "center",
            }}
          />
          <div className="information">
          <div className="information_detail1">
  <div className="column">
    <h5>Tên</h5>
    <input className="Name" type="text" value={"Name"} disabled />
  </div>
  <div className="column">
    <h5>Số điện thoại</h5>
    <input className="phoneNumber" type="text" value={"number"} disabled />
  </div>
</div>

<div className="information_detail1">
  <div className="column">
    <h5>Tuổi</h5>
    <input className="age" type="text" value={"Age"} disabled />
  </div>
  <div className="column">
    <h5>Địa chỉ</h5>
    <input className="address" type="text" value={"Address"} disabled />
  </div>
</div>
<div className="information_detail1">
  <div className="column">
    <h5>Giới tính</h5>
    <input className="Name" type="text" value={"Gender"} disabled />
  </div>
  <div className="column">
    <h5>Email</h5>
    <input className="Email" type="text" value={"Email"} disabled />
  </div>
</div>

            </div>
          
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button style={{ width: "90px" }} onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewDetail;
