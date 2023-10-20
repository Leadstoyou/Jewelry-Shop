import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import ViewDetail from "./ViewDetail";


import axios from "axios";

import "../style/ManagerStaff.scss";
const ManageStaff = () => {
  const [userData, setUserData] = useState([]);
  const [search, setSearch] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [filterAction, setFilterAction] = useState("");


    useEffect(() => {
      axios
        .get(
          `http://localhost:9999/api/v1/users/search?search=${search}`,
          
        )
        .then((response) => {
          if (response.status === 200) {
            console.log("Request was successful");
            const userDataArray = response.data.data.data;
            setUserData(userDataArray); // Store the data in the state
            
          } else {
            console.log("Request was not successful");
          }
        })
        .catch((error) => {
          console.error("An error occurred:", error);
        });
    }, [search]);
  
   console.log(userData);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const handleFilterRole = (event) => {
    setFilterRole(event.target.value);
  };
  const handleFilterAction = (event) => {
    setFilterAction(event.target.value);
  };
  const handleViewDetail = () => {};
  return (
    <div className="all">
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
          onChange={() => setSearch(e.target.value)}
        />
        <Button variant="contained" color="primary" startIcon={<SearchIcon />}>
          Search
        </Button>
      </div>
      <div className="filter">
        <select
          className="select-data"
          value={filterRole}
          onChange={handleFilterRole}
        >
          <option value="all">All</option>
          <option value="staff">Staff</option>
          <option value="customer">Customer</option>
        </select>
        <select
          className="select-data"
          value={filterAction}
          onChange={handleFilterAction}
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
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
            <th>Actor</th>
            <th>Actor</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>index</td>
            <td>name</td>
            <td>age </td>
            <td>phone </td>
            <td>
              <select value={selectedOption} onChange={handleOptionChange}>
                <option value="staff">Staff</option>
                <option value="customer">Customer</option>
              </select>
            </td>
            <td>
              <button className="button">View</button>
            </td>
            <td>
              ok
            </td>
          </tr>
          <tr>
            <td>index</td>
            <td>name</td>
            <td>21 </td>
            <td>0987654321 </td>
            <td>
              <select value={selectedOption} onChange={handleOptionChange}>
                <option value="staff">Staff</option>
                <option value="customer">Customer</option>
              </select>
            </td>
            <td>
              <button className="button" onClick={() => setModalShow(true)}>
                View
              </button>
            </td>
          </tr>
          <ViewDetail show={modalShow} onHide={() => setModalShow(false)} />
        </tbody>
      </Table>
    </div>
  );
};

export default ManageStaff;
