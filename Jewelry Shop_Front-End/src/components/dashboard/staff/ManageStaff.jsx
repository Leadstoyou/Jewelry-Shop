import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import ViewDetail from "./ViewDetail";

import HomeIcon from '@mui/icons-material/Home';

import axios from "axios";

import "../style/ManagerStaff.scss";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
const ControlHome = styled.div`
  position: absolute;
  top: 0;
  left: 0;

`
const ManageStaff = () => {
  const navigate = useNavigate()
  const [userData, setUserData] = useState([]);
  const [search, setSearch] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [filterAction, setFilterAction] = useState("");
  const [action, setAction] = useState("");
  const [calledApi, setCalledApi] = useState(false);

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
  const connectAPI = (search, filterRole, filterAction) => {
    axios
      .get(
        `http://localhost:9999/api/v1/users/search?search=${search}&role=${filterRole}&status=${filterAction}`,
        axiosConfig
      )
      .then((response) => {
        if (response.status === 200) {
          const userDataArray = response.data.data.data.data;
          setUserData(userDataArray);
        } else {
          console.log("Request was not successful");
        }
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  };

  const handleSearch = () => {
    connectAPI(search, filterRole, filterAction);
  };
  const handleOptionChange = () => {
    // connectAPI();
  };
  const handleActionChange = () => {
    // connectAPI();
  };
  
  useEffect(() => {
    if (!calledApi) {
      connectAPI(search, filterRole, filterAction);
      setCalledApi(true);
    }
  }, []);
  return (
    <div className="all" style={{position:'relative'}}>
      <ControlHome onClick={()=>navigate('/')}><button style={{backgroundColor:'#c6c2c2',border:'none '}}><HomeIcon/>Back to home</button></ControlHome>
      <div className="titile">
        <h1>Manager User</h1>
      </div>
      <div
        className="search"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Form.Control
          type="text"
          style={{ width: "30%", height: "40px" }}
          onChange={(e) => {
            setSearch(e.target.value);
            connectAPI(e.target.value, filterRole, filterAction);
          }}
        />
        <Button
          variant="contained"
          color="primary"
          startIcon={<SearchIcon />}
          onClick={handleSearch}
        >
          Search
        </Button>
      </div>
      <div className="filter">
        <select
          className="select-data"
          value={filterRole}
          onChange={(e) => {
            setFilterRole(e.target.value);
            connectAPI(search, e.target.value, filterAction);
          }}
        >
          <option value="">All</option>
          <option value="1">Staff</option>
          <option value="2">Customer</option>
        </select>

        <select
          className="select-data"
          value={filterAction}
          onChange={(e) => {
            setFilterAction(e.target.value);
            connectAPI(search, filterRole, e.target.value);
          }}
        >
          <option value="">All</option>
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>
      </div>
      <Table striped bordered hover className="custom-table">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Age</th>
            <th>Phone Number</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actor</th>
          </tr>
        </thead>
        <tbody>
          {userData && userData.length > 0 ? (
            userData.map((user, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{user.userName}</td>
                <td>{user.userAge}</td>
                <td>{user.userPhoneNumber}</td>
                <td>
                  <select
                    value={user.userRole}
                    onChange={(e) => {
                      setSelectedOption(e.target.value);
                      handleOptionChange();
                    }}
                  >
                    <option value="0">Admin</option>
                    <option value="1">Staff</option>
                    <option value="2">Customer</option>
                  </select>
                </td>
                <td>
                  <select
                    value={user.isActive}
                    onChange={(e) => {
                      setAction(e.target.value);
                      handleActionChange();
                    }}
                  >
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                  </select>
                </td>
                <td>
                  <button className="button" onClick={() => setModalShow(true)}>
                    View
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No user data available.</td>
            </tr>
          )}

          <ViewDetail show={modalShow} onHide={() => setModalShow(false)} />
        </tbody>
      </Table>
    </div>
  );
};

export default ManageStaff;
