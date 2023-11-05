import React, { useEffect, useState } from "react";
import { format, parse } from "date-fns";
import styled from "styled-components";
import Modal from "react-bootstrap/Modal";
import { CollectionFilterSearchDeleteAndPagination } from "../../../services/productAPI.js";
import background from "../../../assets/backgroung.jpg";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MyVerticallyCenteredModal from "./AddDiscount";
import { createContext } from "react";
import UpdateController from "./UpdateController";
import { getAllProducts } from "../../../services/connectApi.js";
import { addProduct } from "../../../services/connectApi.js";
import { deleteProduct } from "../../../services/connectApi.js";
import Pagination from "react-bootstrap/Pagination";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import { getAllProductsDelete } from "../../../services/connectApi.js";
import { useNavigate } from "react-router-dom";
import { updateInRecycler } from "../../../services/connectApi.js";
const Container = styled.div``;

const ControlBody = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Table = styled.table`
  width: 100%;
  margin-top: 20px;
  background-color: #ffffff41;
`;
const TrHead = styled.tr`
  border-collapse: collapse;
  background-color: #c6c3c3;
`;
const Tr = styled.tr`
  border-collapse: collapse;
  background-color: #f8f6f6;
  border-bottom: 1px solid #d8d8db;
`;
const Th = styled.th`
  border-collapse: collapse;
  padding: 30px;
`;
const Td = styled.td`
  padding: 40px;

  border-collapse: collapse;
`;
const PageControl = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  height: 100%;
  background-color: #c6c3c3;
`;

const Header = styled.div`
  text-align: center;
  margin-top: 2%;
  margin-bottom: 2%;
  position: relative;
`;
const ControlButton = styled.div`
  position: absolute;
  top: 0;
  left: 0;
`;
const Restore = styled.button`
  margin-right: 5px;
  border: none;
  outline: none;
  padding: 10px;
  border-radius: 5px;
  background-color: blue;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #5050f5;
  }
`;
const InputSearch = styled.input`
  outline: none;
  border: none;
`;

const ListDeleteProduct = () => {
  var idNumber = 1;
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState(null);
  const [updateData, setUpdateData] = useState(null);
  const [allProduct, setAllproduct] = useState(null);
  const notify = (text) => {
    toast.error(text, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const success = (text) => {
    toast.success(text, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };
  //get data
  let Allpage = [];
  const [activePage, setActivePage] = useState(1);
  const limitP = 5;
  const [totalPage, setTotalpage] = useState(0);
  useEffect(() => {
    if (searchText !== "") {
      Allpage = [];
      CollectionFilterSearchDeleteAndPagination(
        setAllproduct,
        searchText,
        limitP,
        setTotalpage,
        activePage
      );
    }
  }, [searchText, activePage, updateData]);
  useEffect(() => {
    if (searchText === "") {
      Allpage = [];
      const isDeleted = true;
      getAllProductsDelete(
        setAllproduct,
        setTotalpage,
        notify,
        limitP,
        activePage,
        setActivePage,
        isDeleted
      );
    }
  }, [searchText, activePage, updateData]);
  console.log("all product" + allProduct);
  console.log(allProduct);

  useEffect(() => {
    console.log(allProduct);
    console.log(totalPage);
    if (!allProduct && activePage > 1) {
      setActivePage(activePage - 1);
    }
  }, [allProduct]);

  useEffect(() => {
    setActivePage(1);
  }, [searchText]);

  for (let i = 1; i <= totalPage; i++) {
    Allpage.push(i);
  }
  console.log(Allpage);
  const handlePrev = () => {
    if (activePage > 1) {
      setActivePage(activePage - 1);
    }
  };
  const handleNext = () => {
    if (activePage < totalPage) {
      setActivePage(activePage + 1);
    }
  };

  const handleRestore = (id) => {
    if (confirm("Are you sure you want to restore ?")) {
      updateInRecycler(notify, success, setUpdateData, id);
    }
  };

  return (
    <Container>
      <Header>
        <h1>List product in recycle</h1>
        <ControlButton>
          <button
            style={{
              border: "none",
              padding: "10px",
              cursor: "pointer",
              backgroundColor: "#cfcdcd",
            }}
            onClick={() => navigate("/dashboard")}
          >
            Back to dashboard
          </button>
        </ControlButton>
      </Header>
      <div>
        <div
          style={{
            backgroundColor: "white",
            border: "0.5px solid black",
            width: "15%",
          }}
        >
          <SearchIcon />
          <InputSearch onChange={(e) => setSearchText(e.target.value)} />
        </div>
      </div>
      <ControlBody>
        <Table>
          <TrHead>
            <Th>#</Th>
            <Th>Name</Th>
            <Th>Image</Th>
            <Th>Quantity</Th>
            <Th>Price</Th>
            <Th>Category</Th>
            <Th></Th>
          </TrHead>
          {allProduct?.map((p) => {
            if (p.isDeleted) {
              return (
                <Tr key={p._id}>
                  <Td>{idNumber++}</Td>
                  <Td>{p.productName}</Td>
                  <Td style={{ width: "13%" }}>
                    <img
                      src={p.productImage}
                      style={{
                        width: "100%",
                        height: "100px",
                        objectFit: "cover",
                        borderRadius: "50%",
                      }}
                    />
                  </Td>
                  <Td>{p.productQuantity}</Td>
                  <Td>{p.productPrice.toLocaleString("vi-VN")}đ</Td>
                  <Td>{p.productCategory}</Td>
                  <Td style={{ width: "10%" }}>
                    <Restore onClick={() => handleRestore(p._id)}>
                      Restore
                    </Restore>
                  </Td>
                </Tr>
              );
            }
            return null; // Don't render if isDeleted is true
          })}
        </Table>
      </ControlBody>
      {allProduct && (
        <PageControl>
          <Pagination>
            <Pagination.Prev onClick={handlePrev} />
            {Allpage.map((page) => (
              <Pagination.Item
                active={page === activePage}
                onClick={() => setActivePage(page)}
              >
                {page}
              </Pagination.Item>
            ))}
            <Pagination.Next onClick={handleNext} />
          </Pagination>
        </PageControl>
      )}
      <ToastContainer
        style={{ height: "500px" }}
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Container>
  );
};

export default ListDeleteProduct;
