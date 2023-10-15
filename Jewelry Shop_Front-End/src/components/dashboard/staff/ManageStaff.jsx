import React, { useState }  from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import { Checkbox } from '@mui/joy';


import "../style/ManagerStaff.scss";
const ManageStaff = () => {
  const [selectedOption, setSelectedOption] = useState('1'); // Lựa chọn mặc định

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
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
        <Form.Control type="text" style={{ width: "30%", height: "40px" }} />
        <Button variant="contained" color="primary" startIcon={<SearchIcon />}>
          Search
        </Button>
      </div>
      <Table striped bordered hover  className="custom-table">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Age</th>
            <th>Phone Number</th>
            <th>Role</th>
            <th>Actor</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>index</td>
            <td>name</td>
            <td>21 </td>
            <td>0987654321 </td>
            <td><select value={selectedOption} onChange={handleOptionChange}>
              <option value="staff">Staff</option>
              <option value="customer">Customer</option>
            </select></td>
            <td>
             
              <button className="button">View</button>
            </td>
          </tr>
          <tr>
            <td>index</td>
            <td>name</td>
            <td>21 </td>
            <td>0987654321 </td>
            <td><select value={2} onChange={handleOptionChange}>
              <option value="staff">Staff</option>
              <option value="customer">Customer</option>
            </select></td>
            <td>
             
              <button className="button">View</button>
            </td>
          </tr>
        </tbody>
      </Table>
 </div>
    
  

  );
};

export default ManageStaff;
