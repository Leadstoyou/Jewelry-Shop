import React, { useEffect, useState } from "react";
import { format, parse } from "date-fns";
import styled from "styled-components";
import Modal from "react-bootstrap/Modal";
import background from "../../../assets/backgroung.jpg";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import RiseLoader from "react-spinners/RiseLoader";
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
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import { CollectionFilterSearchAndPagination } from "../../../services/productAPI.js";
const Container = styled.div``;
const Function = styled.div`
  background-color: #c5c2c2;
  position: relative;
  top: 0;
  right: -4.5%;
  width: 95.4%;
  padding: 10px;
`;
const ControlHome = styled.div`
  position: absolute;
  top: 0%;
  left: 5%;
`;
const Button = styled.button`
  padding: 10px;
  color: white;
  background-color: rgb(21, 21, 238);
  border-radius: 10px;
  border-color: transparent;
  outline: none;
  &:hover {
    background-color: rgb(113, 113, 254);
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
  background-color: rgb(21, 237, 21);
  border-radius: 10px;
  border-color: transparent;
  outline: none;
  &:hover {
    background-color: rgb(157, 238, 157);
  }
`;

const Control = styled.div`
  display: grid;
  grid-template-columns: 25% 75%;
  margin-bottom: 3%;
`;
const Label = styled.label``;
const Input = styled.input`
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
const TrHead = styled.tr`
  border-collapse: collapse;
  z-index: 1;
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
const ButtonListDelete = styled.button`
  margin-top: 10px;
  padding: 10px;
  color: white;
  background-color: #f22a2a;
  border-radius: 10px;
  border-color: transparent;
  outline: none;
  &:hover {
    background-color: #f98a8a;
  }
`;
const BtnControl = styled.div`
  width: 100%;
  display: flex;

  /* align-items: center; */
  justify-content: space-between;
`;

const Update = styled.button`
  margin-right: 5px;
  border: none;
  outline: none;
  padding: 10px;
  border-radius: 5px;
  background-color: green;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #76f876;
  }
`;

const Delete = styled.button`
  margin-right: 5px;
  border: none;
  outline: none;
  padding: 10px;
  border-radius: 5px;
  background-color: red;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #f24a4a56;
  }
`;

const InputSearch = styled.input`
  outline: none;
  border: none;
`;

//manage form
export const UpdateControl = createContext();
const ManageProduct = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState(null);
  const [idDelete, setIdDelete] = useState(null);
  const [updateData, setUpdateData] = useState(null);
  const [updateProduct, setUpdateProduct] = useState(null);
  const [allProduct, setAllproduct] = useState([]);
  const [showUpdate, setShowUpdate] = useState(false);
  const [addData, setAddData] = useState({});
  const [existErr, setExist] = useState(false);
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const notify = (text) => {
    toast.error(text, {
      position: "top-right",
      autoClose: 500,
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
      autoClose: 500,
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
    category: yup.string(),
    img: yup
      .mixed()
      .test("fileRequired", "Please upload an image.", (value) => {
        return value && value.length > 0;
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

  //add product
  const onSubmit = (data) => {
    handleClose();

    const lmeo = document.getElementById("img").files[0];
    const reader = new FileReader();
    reader.onload = async () => {
      const newData = {
        ...addData,
        productName: data.pname.trim(),
        productDescription: data.desc.trim(),
        productQuantity: data.quantity,
        productSizes: data.size.trim().split(","),
        productPrice: data.price,
        productColors: data.color.trim().split(","),
        productMaterials: data.material.trim().split(","),
        productCategory: data.category.trim(),
        productImage: reader.result,
      };

      await addProduct(newData, success, notify);
      await setAddData(newData);
    };
    reader.readAsDataURL(lmeo);
  };

  var idNumber = 1;
  useEffect(() => {
    console.log(addData);
    idNumber = 0;
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

  //delete product
  const handleDelete = async (_id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (confirm) {
      await deleteProduct(_id);
      await setIdDelete(_id);
      success("Delete product successfully !!!");
    }
  };

  //get data
  //allProduct, setAllproduct
  let Allpage = [];
  const [activePage, setActivePage] = useState(1);
  const limitP = 5;
  const [totalPage, setTotalpage] = useState(0);
  console.log("active page: " + activePage);
  useEffect(() => {
    if (searchText !== "") {
      Allpage = [];
      CollectionFilterSearchAndPagination(
        setAllproduct,
        searchText,
        limitP,
        setTotalpage,
        activePage
      );
    }
  }, [searchText, addData, updateData, updateProduct, idDelete, activePage]);

  useEffect(() => {
    if (searchText === "") {
      Allpage = [];
      getAllProducts(setAllproduct, setTotalpage, notify, limitP, activePage);
    }
  }, [searchText, addData, updateData, updateProduct, idDelete, activePage]);

  useEffect(() => {
    console.log(allProduct);
    console.log(totalPage);
    if (!allProduct && activePage > 1) {
      setActivePage(activePage - 1);
    }
  }, [allProduct]);

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

  const categories = ["Dây Chuyền", "Vòng tay", "Hoa Tai", "Charm", "Nhẫn"];

  for (let i = 1; i <= totalPage; i++) {
    Allpage.push(i);
  }
  console.log(Allpage);
  const handlePrev = () => {
    setActivePage((prevPage) => {
      if (prevPage > 1) {
        return prevPage - 1;
      }
      return prevPage;
    });
  };

  const handleNext = () => {
    setActivePage((prevPage) => {
      if (prevPage < totalPage) {
        return prevPage + 1;
      }
      return prevPage;
    });
  };

  return (
    <>
      {loading ? (
        <Container
          style={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <RiseLoader color={"#575855"} size={30} loading={loading} />
        </Container>
      ) : (
        <Container>
          <ControlHome onClick={() => navigate("/")}>
            <button style={{ backgroundColor: "#c6c2c2", border: "none " }}>
              <HomeIcon />
              Back to home
            </button>
          </ControlHome>
          <h1 style={{ padding: "1%" }}>Manage products</h1>
          <Function>
            <ControlAdd>
              <AddController.Provider value={{ addData, setAddData }}>
                <BtnControl>
                  <div>
                    <div style={{ backgroundColor: "white", marginTop: "20%" }}>
                      <SearchIcon />
                      <InputSearch
                        onChange={(e) => setSearchText(e.target.value)}
                      />
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <Button onClick={handleShow}>Add Product</Button>
                    <ButtonListDelete onClick={() => navigate("/listdelete")}>
                      List product you have just deleted
                    </ButtonListDelete>
                  </div>
                </BtnControl>
                {/* modal add  */}
                <Modal
                  show={show}
                  onHide={handleClose}
                  style={{ borderRadius: "5%", color: "white" }}
                >
                  <Modal.Body
                    style={{
                      color: "black",
                      borderRadius: "1%",
                    }}
                  >
                    <Modal.Title>
                      <h2 style={{ marginBottom: "8%", textAlign: "center" }}>
                        Add new product
                      </h2>
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
                        <Label
                          htmlFor="quantity"
                          style={{ fontWeight: "bolder" }}
                        >
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
                        <Label
                          htmlFor="material"
                          style={{ fontWeight: "bolder" }}
                        >
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
                        <Label
                          htmlFor="category"
                          style={{ fontWeight: "bolder" }}
                        >
                          Category
                        </Label>
                        <div>
                          <select
                            style={{ width: "100%", border: "1px solid black" }}
                            id="category"
                            {...register("category")}
                          >
                            {categories.map((category, index) => (
                              <option key={index} value={category}>
                                {category}
                              </option>
                            ))}
                          </select>
                        </div>
                      </Control>
                      <Control>
                        <Label htmlFor="desc" style={{ fontWeight: "bolder" }}>
                          Description
                        </Label>
                        <div>
                          <textarea
                            type="text"
                            id="desc"
                            style={{ width: "100%" }}
                            {...register("desc")}
                          />
                        </div>
                      </Control>
                      <Control>
                        <Label htmlFor="img" style={{ fontWeight: "bolder" }}>
                          Image
                        </Label>
                        <div
                          style={{ backgroundColor: "white", color: "black" }}
                        >
                          <Input
                            type="file"
                            id="img"
                            style={{ width: "100%" }}
                            {...register("img")}
                           
                            accept="image/*"
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
                          onClick={(e) => {
                            e.preventDefault();
                            setModalShow(true);
                          }}
                        >
                          Add discount
                        </Button>
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
                    <MyVerticallyCenteredModal
                      show={modalShow}
                      onHide={() => setModalShow(false)}
                    />
                  </Modal.Body>
                </Modal>
              </AddController.Provider>
            </ControlAdd>
            <ControlBody>
              <Table>
              <TrHead style={{ position: 'sticky', top: '0' , backgroundColor:'#e3e0e0'}}>
                  <Th>#</Th>
                  <Th>Name</Th>
                  <Th>Image</Th>
                  <Th>Quantity</Th>
                  <Th>Price</Th>
                  <Th>Category</Th>
                  <Th></Th>
                </TrHead>

                {allProduct?.map(
                  (p) => (
                    // !p.isDeleted && (
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
                        <Update
                          onClick={() => {
                            setUpdateProduct(p);
                            setShowUpdate(true);
                          }}
                        >
                          Update
                        </Update>

                        <Delete onClick={() => handleDelete(p._id)}>
                          Delete
                        </Delete>
                      </Td>
                    </Tr>
                  )
                  // )
                )}
              </Table>
            </ControlBody>
            <UpdateControl.Provider value={{ updateData, setUpdateData }}>
              <UpdateController
                updateProduct={updateProduct}
                show={showUpdate}
                onHide={() => setShowUpdate(false)}
              />
            </UpdateControl.Provider>
            {allProduct && (
              <PageControl>
                <Pagination>
                  <Pagination.Prev onClick={handlePrev} />
                  {Allpage.map((page) => (
                    <Pagination.Item
                      key={page}
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
          </Function>
          <ToastContainer
            style={{ height: "500px" }}
            position="top-center"
            autoClose={500}
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
      )}
    </>
  );
};

export default ManageProduct;
