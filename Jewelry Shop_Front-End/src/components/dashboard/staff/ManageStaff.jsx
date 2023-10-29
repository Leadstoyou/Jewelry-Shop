import React, { useEffect, useState,useCallback } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import ViewDetail from "./ViewDetail";
import HomeIcon from "@mui/icons-material/Home";
import Pagination from "react-bootstrap/Pagination"; // Import React-Bootstrap Pagination
import axios from "axios";
import Switch from "react-switch";
import "../style/ManagerStaff.scss";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import {axiosConfig} from "../../../config/acessToken.js"

const ControlHome = styled.div`
  position: absolute;
  top: 0;
  left: 0;
`;

const ManageStaff = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);
  const [search, setSearch] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [filterAction, setFilterAction] = useState("");
  const [action, setAction] = useState(false);
  const [block, setBlock] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [calledApi, setCalledApi] = useState(false);
  const [totalPage, setTotalPage] = useState(10);
  const [userIds, setUserIds] = useState(null);

  const size = 10;

//Connect api to take all user
  const connectAPI = (search, filterRole, filterAction, activePage) => {
    let searchString = ""
    let statusAction, roleAction 
    if(search ){
      searchString = `search=${search}`
    }
    if(filterAction){
      statusAction = `status=${filterAction}`
    }
    if(filterRole){
      roleAction = `role=${filterRole}`
    }
    axios
      .get(
        `http://localhost:9999/api/v1/users/search?${searchString}&${roleAction}&${statusAction}&size=${size}&page=${activePage}`,
        axiosConfig
      )
      .then((response) => {
        if (response.status === 200) {
          const userDataArray = response.data.data.data;
          setUserData(userDataArray);
          setTotalPage(Math.ceil((response.data.data.total)/size));
        } else {
          console.log("Request was not successful");
        }
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  };
  

//Change Role
  const changeRole = async (userId, newRole) => {
    try {
      const response = await axios.put(
        "http://localhost:9999/api/v1/users/updateRole",
        {
          userId: userId,
          newRole: newRole,
        },
        axiosConfig
      );
    }
    catch (error) {
      console.log(error);
    }};
  //Change Status
    const changeStatus = async (userId, newStatus) => {
      try {
        const response = await axios.put(
          "http://localhost:9999/api/v1/users/updateStatus",
          {
            userId,
            newStatus,
          },
          axiosConfig
        );
      }
      catch (error) {
        console.log(error);
      }};
    //Block account
      const changeAdmin = async (userId,newBlock) => {
        try {
          const response = await axios.put(
            "http://localhost:9999/api/v1/users/updateBlock",
            {
              userId ,
              newBlock
            },
            axiosConfig
          );
        }
        catch (error) {
          console.log(error);
        }};

  const handleSearch = () => {
    connectAPI(search, filterRole, filterAction, 1);
  };
 
  const handleNewRole = (userId, newRole) => {
   console.log(newRole);
    if (window.confirm("Do you want to change your role")) {
          changeRole(userId, newRole).then(() => {
            console.log("change success");
            connectAPI(search, filterRole, filterAction, activePage);
    
          })
          .catch((error) => {
            console.error(error);
          });
          alert(`change role successfully`);
        }
  };


  // Paging
  const Allpage = [];
  for (let i = 1; i <= totalPage; i++) {
    Allpage.push(i);
  }

 
  const handlePrev = () => {
    if (activePage > 1) {
      setActivePage(activePage - 1);
    connectAPI(search, filterRole, filterAction, activePage-1);
    }
  };

  const handleNext = () => {
    if (activePage < totalPage) {
      setActivePage(activePage + 1);
      connectAPI(search, filterRole, filterAction, activePage+1);
    }
  };

//Change Role
const handleChange = async (action, userId) => {
  console.log(userId); // User ID
  console.log(action); // New status
  if (changeStatus(userId, action)) {
    connectAPI(search, filterRole, filterAction, activePage);
    alert("Status updated");
  }
};

const handleChangeBlock = async (block, userId) => {
  console.log(userId); // User ID
  console.log(block); // New status

  try {

    if ( changeAdmin(userId, block)) {
      console.log(block);
    connectAPI(search, filterRole, filterAction, activePage);
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

 const handleView = (userIds) =>{
  setModalShow(true)
  setUserIds(userIds);
 }
  useEffect(() => {
    if (!calledApi) {
      connectAPI(search, filterRole, filterAction, activePage);
      setCalledApi(true);
    }
  });

  return (
    <div className="all" style={{ position: "relative" }}>
      <ControlHome onClick={() => navigate("/")}>
        <button
          style={{
            backgroundColor: "#c6c2c2",
            display: "none ",
            marginLeft: "0px",
          }}
        >
          <HomeIcon />
          Back to home
        </button>
      </ControlHome>
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
            connectAPI(e.target.value, filterRole, filterAction, activePage);
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
            connectAPI(search, e.target.value, filterAction, activePage);
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
            connectAPI(search, filterRole, e.target.value, activePage);
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
            <th>Email</th>
            <th>Phone Number</th>
            <th>Role</th>
            <th>Status</th>
            <th>Block</th>
            <th>Actor</th>
          </tr>
        </thead>
        <tbody>
          {userData && userData.length > 0 ? (
            userData        
              .map((user, index) => (
                <tr key={index}>
                  <td>{(activePage - 1) * size + index + 1}</td>
                  <td>{user.userName}</td>
                  <td>{user.userEmail}</td>
                  <td>{user.userPhoneNumber}</td>
                  <td>
                    <input type="hidden" value={user._id} id="idrole" />
                    <select value={user.userRole} onChange={(e) => handleNewRole(user._id, e.target.value)}>
                      <option value="0">Admin</option>
                      <option value="1">Staff</option>
                      <option value="2">Customer</option>
                    </select>
                  </td>
                  <td>
                  <input type="hidden" value={user._id} id="idaction" />
                  <Switch onChange={(action) => handleChange(action, user._id)} checked={user.isActive} />
                  </td>
                  <td>
                  <Switch onChange={(block) => handleChangeBlock(block,user._id)} checked={user.isDelete} />
                  </td>
                  <td>
                    <button
                      className="button"
                      onClick={()=>handleView(user._id)}
                    
                    >
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

          <ViewDetail show={modalShow} onHide={() => setModalShow(false) } userIds={userIds} />
        </tbody>
      </Table>
      <div className="paging">
        <Pagination>
          <Pagination.Prev onClick={handlePrev}  />
          {Allpage.map((page) => (
            <Pagination.Item
              key={page}
              active={page === activePage}
              onClick={() => {setActivePage(page),  connectAPI(search, filterRole, filterAction, page);
              }}
            >
              {page}
            </Pagination.Item>
          ))}

          <Pagination.Next onClick={handleNext} />
        </Pagination>
        <br />
      </div>
 
   
    </div>
  );
};

export default ManageStaff;
