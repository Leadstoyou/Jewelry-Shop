import React, { useEffect, useState , useContext } from "react";
import { format, parse } from "date-fns";
import styled from "styled-components";
import Modal from "react-bootstrap/Modal";
import background from "../../../assets/backgroung.jpg";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createContext } from "react";
import { UpdateControl } from "./ManageProduct.jsx";
import { updateProduct } from "../../../services/connectApi.js";
import MyVerticallyCenteredModal from "./UpdateDiscount";

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
  
  outline: none;
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
const ImgControle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;


//manage form

const UpdateController = (props) => {
  const productUpdate = props.updateProduct;
  console.log(productUpdate);
  const { updateData, setUpdateData } = useContext(UpdateControl);
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
      .test("fileSize", "File size is too large. Max 2MB allowed.", (value) => {
        if (!value || !value[0]) {
          return true;
        }
        return value[0].size <= 2 * 1024 * 1024; // 2MB in bytes
      }),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    props.onHide();
    const lmeo = document.getElementById("img").files[0];

    if (lmeo) {
      const reader = new FileReader();
      reader.onload = async function () {
        const newData = {
          ...updateData,
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
        console.log("hello");
        console.log(newData);
        await updateProduct(productUpdate._id, notify, success, newData);
        setUpdateData(newData);
      };
      reader.readAsDataURL(lmeo);
    } else {
      const newData = {
        ...updateData,
        productName: data.pname.trim(),
        productDescription: data.desc.trim(),
        productQuantity: data.quantity,
        productSizes: data.size.trim().split(","),
        productPrice: data.price,
        productColors: data.color.trim().split(","),
        productMaterials: data.material.trim().split(","),
        productCategory: data.category.trim(),
      };
      console.log("hello");
      console.log(newData);
      await updateProduct(productUpdate._id, notify, success, newData);
      setUpdateData(newData);
    }
  };

  useEffect(() => {
    // console.log(updateData);
  }, [updateData]);

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

  useEffect(() => {
    if (props.show) {
      reset(); // Reset the form when the modal is shown
    }
  }, [props.show]);

  const categories = ["Dây Chuyền", "Vòng tay", "Hoa Tai", "Charm", "Nhẫn"];

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      style={{ borderRadius: "5%", color: "white" }}
    >
      
        <Modal.Body
          style={{
             color:'black',
            borderRadius: "1%",
          }}
        >
          <Modal.Title>
            <h2 style={{ marginBottom: "8%" , textAlign:'center'}}>Update product</h2>
          </Modal.Title>
          <form id="formController" onSubmit={handleSubmit(onSubmit)}>
            <ImgControle>
              <img
                src={productUpdate && productUpdate?.productImage}
                style={{ width: "50%", height: "150px", borderRadius: "50%" }}
              />
            </ImgControle>
            <Control>
              <Label htmlFor="pname" style={{ fontWeight: "bolder" }}>
                Product name
              </Label>
              <div>
                <Input
                  type="text"
                  id="pname"
                  style={{ width: "100%" }}
                  defaultValue={productUpdate && productUpdate?.productName}
                  {...register("pname")}
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
                  defaultValue={productUpdate && productUpdate?.productQuantity}
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
                  defaultValue={productUpdate && productUpdate?.productPrice}
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
                  defaultValue={productUpdate && productUpdate?.productSizes}
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
                  defaultValue={productUpdate && productUpdate?.productColors}
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
                  defaultValue={
                    productUpdate && productUpdate?.productMaterials
                  }
                  {...register("material")}
                />
              </div>
            </Control>
            <Control>
              <Label htmlFor="material" style={{ fontWeight: "bolder" }}>
                Category
              </Label>
              <div>
                <select
                  style={{ width: "100%" , border : '1px solid black' }}
                  id="category"
                  {...register("category")}
                  defaultValue={productUpdate?.productCategory}
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
                  defaultValue={
                    productUpdate && productUpdate?.productDescription
                  }
                  {...register("desc")}
                />
              </div>
            </Control>
            <Control>
              <Label htmlFor="img" style={{ fontWeight: "bolder" }}>
                Update Image
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
                onClick={(e) => {
                  e.preventDefault();
                  setModalShow(true);
                }}
              >
                Update discount
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
                type="button"
                onClick={props.onHide}
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
                Update
              </ButtonSave>
            </div>
          </form>
          <MyVerticallyCenteredModal
            productUpdate={productUpdate?.productDiscount}
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
        </Modal.Body>
    

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
    </Modal>
  );
};

export default UpdateController;
