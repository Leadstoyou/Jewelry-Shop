import React, { useEffect, useState } from "react";
import { format, parse } from "date-fns";
import styled from "styled-components";
import Modal from "react-bootstrap/Modal";
import background from "../../../assets/backgroung.jpg";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MyVerticallyCenteredModal from "./AddDiscount";
import { createContext } from "react";
import UpdateController from "./UpdateController";
import { getAllProducts } from "../../../api/connectApi.js";
import { addProduct } from "../../../api/connectApi.js";
import { deleteProduct } from "../../../api/connectApi.js";
import Pagination from "react-bootstrap/Pagination";
import axios from "axios";
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
`;
const Tr = styled.tr`
  border-collapse: collapse;
  background-color: #f8f6f6;
  border-bottom: 1px solid pink;
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
  margin-top: 20px;
`;

const ListDeleteProduct = () => {
  const [idDelete, setIdDelete] = useState(null);
  const [updateData, setUpdateData] = useState(null);
  const [updateProduct, setUpdateProduct] = useState(null);
  const [allProduct, setAllproduct] = useState(null);
  const [showUpdate, setShowUpdate] = useState(false);
  const [addData, setAddData] = useState({});
  const [existErr, setExist] = useState(false);
  const [modalShow, setModalShow] = useState(false);
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
  //allProduct, setAllproduct
  useEffect(() => {
    getAllProducts(setAllproduct, notify);
  }, [addData, updateData, updateProduct, idDelete]);

  useEffect(() => {
    console.log(allProduct);
  }, [allProduct]);

  return (
    <Container>
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
            if (!p.isDeleted) {
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
                  <Td style={{ width: "20%" }}>
                    <button
                      onClick={() => {
                        setUpdateProduct(p);
                        setShowUpdate(true);
                      }}
                      style={{
                        marginRight: "5px",
                        border: "none",
                        outline: "none",
                        padding: "10px",
                        borderRadius: "5px",
                        backgroundColor: "green",
                        color: "white",
                        cursor: "pointer",
                      }}
                    >
                      Update
                    </button>
                    <button
                      style={{
                        border: "none",
                        outline: "none",
                        padding: "10px",
                        borderRadius: "5px",
                        backgroundColor: "red",
                        color: "white",
                        cursor: "pointer",
                      }}
                      onClick={() => handleDelete(p._id)}
                    >
                      Delete
                    </button>
                  </Td>
                </Tr>
              );
            }
            return null; // Don't render if isDeleted is true
          })}
        </Table>
      </ControlBody>
      <PageControl>
        <Pagination>
          <Pagination.Prev />
          <Pagination.Item>{1}</Pagination.Item>
          <Pagination.Next />
        </Pagination>
      </PageControl>
    </Container>
  );
};

export default ListDeleteProduct;
