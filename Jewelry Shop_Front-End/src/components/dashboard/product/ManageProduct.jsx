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
const Container = styled.div``;
const Function = styled.div`
  background-color: #dba1a1;
  position: relative;
  top: 0;
  right: -4.5%;
  width: 95%;
  padding: 10px;
`;
const Button = styled.button`
  padding: 10px;
  color: white;
  background-color: rgb(80, 80, 243);
  border-radius: 10px;
  border-color: transparent;
  outline: none;
  &:hover {
    background-color: rgb(57, 57, 246);
  }
`;
const ButtonClose = styled.button`
  padding: 10px;
  background-color: rgb(247, 103, 103);
  border-radius: 10px;
  border-color: transparent;
  outline: none;
  &:hover {
    background-color: rgb(246, 63, 63);
  }
`;

const ButtonSave = styled.button`
  padding: 10px;
  background-color: rgb(105, 239, 105);
  border-radius: 10px;
  border-color: transparent;
  outline: none;
  &:hover {
    background-color: rgb(55, 241, 55);
  }
`;

const Control = styled.div`
  display: grid;
  grid-template-columns: 25% 75%;
  margin-bottom: 3%;
`;
const Label = styled.label``;
const Input = styled.input`
  border: none;
  outline: none;
`;
const DiscountControl = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const ControlAdd = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: end;
`;

const ControlBody = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const AddController = createContext();

const Table = styled.table`
width: 100%;
margin-top: 20px;
  background-color: #ffffff41;
`;
const Tr = styled.tr`
  border-collapse: collapse;
`;
const Th = styled.th`
  border-collapse: collapse;
  padding: 30px;
`;
const Td = styled.td`
  padding: 40px;

  border-collapse: collapse;
`;

//manage form

const ManageProduct = () => {
  const [showUpdate, setShowUpdate] = useState(false);
  const [addData, setAddData] = useState({
    productName: "",
    productDescription: "",
    productQuantity: 0,
    productSizes: [],
    productPrice: 0,
    productColors: [],
    productMaterials: [],
    productCategory: "",
    productDiscount: [
      {
        discountName: "",
        discountDescription: "",
        discountStartDate: "",
        discountExpiredDate: "",
        discountPercentage: 0,
        usageLimit: 0,
      },
    ],
    productImage: "",
  });
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
    toast.success("Add successfull !", {
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

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    reset();
    setShow(true);
  };

  const schema = yup.object().shape({
    pname: yup.string().required("Please enter product name"),
    desc: yup.string().required("Please enter description"),
    quantity: yup
      .number()
      .typeError("Quantity must be a number")
      .positive("Quantity must be greater than zero")
      .integer("Quantity must be an integer")
      .min(1, "Quantity must be at least 1")
      .required("Quantity is required"),
    price: yup
      .number()
      .typeError("Price must be a number")
      .positive("Price must be greater than zero")
      .integer("Price must be an integer")
      .min(10000, "Price must be at least 10000")
      .required("Price is required"),
    size: yup.string().required("Please enter size"),
    color: yup.string().required("Please enter color"),
    material: yup.string().required("Please enter material"),
    category: yup.string().required("Please enter category"),
    img: yup
      .mixed()
      .test("fileRequired", "Please upload an image.", (value) => {
        return value && value.length > 0; // Check if the value is not null and has a length
      })
      .required("You need to provide a file"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    handleClose();

    setTimeout(() => {
      success("add success");
    }, 100);

    setAddData({
      ...addData,
      productName: data.pname.trim(),
      productDescription: data.desc.trim(),
      productQuantity: data.quantity,
      productSizes: data.size.trim().split(","),
      productPrice: data.price,
      productColors: data.color.trim().split(","),
      productMaterials: data.material.trim().split(","),
      productCategory: data.category.trim(),
      productImage: data.img,
    });
  };

  useEffect(() => {
    console.log(addData);
  }, [addData]);

  useEffect(() => {
    if (existErr) {
      toast.dismiss();

      notify(errors.pname?.message);
      notify(errors.desc?.message);
      notify(errors.quantity?.message);
      notify(errors.size?.message);
      notify(errors.color?.message);
      notify(errors.material?.message);
      notify(errors.category?.message);
      notify(errors.price?.message);
      notify(errors.img?.message);
    }
  }, [existErr, errors]);

  return (
    <Container>
      <h1 style={{ padding: "1%" }}>Manage products</h1>
      <Function>
        <ControlAdd>
          <AddController.Provider value={{ addData, setAddData }}>
            <Button onClick={handleShow}>Add Product</Button>
            {/* modal add  */}
            <Modal
              show={show}
              onHide={handleClose}
              style={{ borderRadius: "5%", color: "white" }}
            >
              <Modal.Body
                style={{
                  backgroundImage: `url(${background})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  borderRadius: "1%",
                }}
              >
                <Modal.Title>
                  <h2 style={{ marginBottom: "8%" }}>Add new product</h2>
                </Modal.Title>
                <form id="formController" onSubmit={handleSubmit(onSubmit)}>
                  <Control>
                    <Label htmlFor="pname" style={{ fontWeight: "bolder" }}>
                      Product name
                    </Label>
                    <div>
                      <Input
                        type="text"
                        id="pname"
                        style={{ width: "100%" }}
                        {...register("pname")}
                      />
                    </div>
                  </Control>
                  <Control>
                    <Label htmlFor="desc" style={{ fontWeight: "bolder" }}>
                      Description
                    </Label>
                    <div>
                      <Input
                        type="text"
                        id="desc"
                        style={{ width: "100%" }}
                        {...register("desc")}
                      />
                    </div>
                  </Control>
                  <Control>
                    <Label htmlFor="quantity" style={{ fontWeight: "bolder" }}>
                      Quantity
                    </Label>
                    <div>
                      <Input
                        type="text"
                        id="quantity"
                        style={{ width: "100%" }}
                        {...register("quantity")}
                      />
                    </div>
                  </Control>
                  <Control>
                    <Label htmlFor="price" style={{ fontWeight: "bolder" }}>
                      Price
                    </Label>
                    <div>
                      <Input
                        type="text"
                        id="price"
                        style={{ width: "100%" }}
                        {...register("price")}
                      />
                    </div>
                  </Control>
                  <Control>
                    <Label htmlFor="size" style={{ fontWeight: "bolder" }}>
                      Size
                    </Label>
                    <div>
                      <Input
                        type="text"
                        id="size"
                        style={{ width: "100%" }}
                        {...register("size")}
                      />
                    </div>
                  </Control>
                  <Control>
                    <Label htmlFor="color" style={{ fontWeight: "bolder" }}>
                      Color
                    </Label>
                    <div>
                      <Input
                        type="text"
                        id="color"
                        style={{ width: "100%" }}
                        {...register("color")}
                      />
                    </div>
                  </Control>
                  <Control>
                    <Label htmlFor="material" style={{ fontWeight: "bolder" }}>
                      Material
                    </Label>
                    <div>
                      <Input
                        type="text"
                        id="material"
                        style={{ width: "100%" }}
                        {...register("material")}
                      />
                    </div>
                  </Control>
                  <Control>
                    <Label htmlFor="material" style={{ fontWeight: "bolder" }}>
                      Category
                    </Label>
                    <div>
                      <Input
                        type="text"
                        id="category"
                        style={{ width: "100%" }}
                        {...register("category")}
                      />
                    </div>
                  </Control>

                  <Control>
                    <Label htmlFor="img" style={{ fontWeight: "bolder" }}>
                      Image
                    </Label>
                    <div style={{ backgroundColor: "white", color: "black" }}>
                      <Input
                        type="file"
                        id="img"
                        style={{ width: "100%" }}
                        {...register("img")}
                      />
                    </div>
                  </Control>
                  <div
                    style={{
                      width: "100%",
                      marginTop: "20px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Button
                      variant="primary"
                      onClick={() => setModalShow(true)}
                    >
                      Add discount
                    </Button>

                    <MyVerticallyCenteredModal
                      show={modalShow}
                      onHide={() => setModalShow(false)}
                    />
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginTop: "50px",
                    }}
                  >
                    <ButtonClose
                      onClick={handleClose}
                      style={{ fontWeight: "bolder" }}
                    >
                      Close
                    </ButtonClose>
                    <ButtonSave
                      style={{ fontWeight: "bolder" }}
                      type="submit"
                      onClick={(e) => {
                        if (Object.keys(errors).length >= 0) {
                          setExist(true);
                          setTimeout(() => {
                            setExist(false);
                          }, 1000);
                        }
                      }}
                    >
                      Add
                    </ButtonSave>
                  </div>
                </form>
              </Modal.Body>
            </Modal>
          </AddController.Provider>
        </ControlAdd>
        <ControlBody>
          <Table>
            <Tr>
              <Th>Name</Th>
              <Th>Image</Th>
              <Th>Quantity</Th>
              <Th>Price</Th>
              <Th>Category</Th>
              <Th></Th>
            </Tr>
            <Tr>
              <Td>Name</Td>

              <Td>Image</Td>

              <Td>Quantity</Td>

              <Td>Price</Td>

              <Td>Category</Td>
              <Td>
                <button
                  onClick={() => setShowUpdate(true)}
                  style={{
                    marginRight: "5px",
                    border: "none",
                    outline: "none",
                    padding: "10px",
                    borderRadius: "5px",
                    backgroundColor: "green",
                    color: "white",
                    cursor: 'pointer'
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
                    cursor: 'pointer'
                  }}
                >
                  Delete
                </button>
              </Td>
            </Tr>
          </Table>
        </ControlBody>
        <UpdateController
          show={showUpdate}
          onHide={() => setShowUpdate(false)}
        />
      </Function>
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

export default ManageProduct;