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
import { useContext } from "react";
import { UpdateControl } from "./UpdateController.jsx";
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


function MyVerticallyCenteredModal(props) {
  const { updateData, setUpdateData } = useContext(UpdateControl);
  const [existErr, setExist] = useState(false);

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
    toast.success("Update discount successfull !", {
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

  const [show, setShow] = useState(true);

  const schema = yup.object().shape({
    dname: yup.string().required(),
    ddesc: yup.string().required(),
    dstart: yup
      .mixed()
      .transform((value, originalValue) => {
        if (originalValue === "null") {
          return null;
        }
    
        return originalValue ? new Date(originalValue) : null;
      })
      .nullable()
      .typeError("Please enter a valid date"),

    dexpired: yup
      .mixed()
      .transform((value, originalValue) => {
        if (originalValue === "null") {
          return null;
        }
        return originalValue ? new Date(originalValue) : null;
      })
      .nullable()
      .typeError("Please enter a valid date")
      .test(
        "is-greater-than-start",
        "Expiration date must be greater than or equal to the start date",
        function (value) {
          const { dstart } = this.parent;
          return !dstart || !value || value >= dstart;
        }
      ),
    dpercent: yup
      .number()
      .positive("You must input a positive number for dpercent")
      .typeError("You must input a number for dpercent"),
    dlimit: yup
      .number()
      .positive("You must input a positive number for dlimit")
      .typeError("You must input a number for dlimit"),
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
    props.onHide();

    setTimeout(() => {
      success("update successfully !!!");
    }, 100);
    setUpdateData({
      ...updateData,
      productDiscount: [
        {
          discountName: data.dname,
          discountDescription: data.ddesc,
          discountStartDate: data.dstart,
          discountExpiredDate: data.dexpired,
          discountPercentage: data.dpercent,
          usageLimit: data.dlimit,
        },
      ],
    });
    console.log(updateData);
  };

  useEffect(() => {
    console.log(updateData);
  }, [updateData]);

  useEffect(() => {
    if (existErr) {
      toast.dismiss();
      notify(errors.dname?.message);
      notify(errors.ddesc?.message);
      notify(errors.dstart?.message);
      notify(errors.dexpired?.message);
      notify(errors.dpercent?.message);
      notify(errors.dlimit?.message);
      notify(errors.img?.message);
    }
  }, [existErr, errors]);

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          borderRadius: "1%",
          color: "white",
        }}
      >
        <Modal.Title>
          <h2 style={{ marginBottom: "8%" }}>Update discount</h2>
        </Modal.Title>
        <form id="formController" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Control>
              <Label htmlFor="dname" style={{ marginLeft: "10px" }}>
                Discount name
              </Label>
              <div>
                <Input
                  type="text"
                  id="dname"
                  style={{ width: "100%" }}
                  {...register("dname")}
                />
              </div>
            </Control>
            <Control>
              <Label htmlFor="ddesc" style={{ marginLeft: "10px" }}>
                Discount Description
              </Label>
              <div>
                <Input
                  type="text"
                  id="ddesc"
                  style={{ width: "100%" }}
                  {...register("ddesc")}
                />
              </div>
            </Control>
            <Control>
              <Label htmlFor="startdate" style={{ marginLeft: "10px" }}>
                Discount Start Date
              </Label>
              <div>
                <Input
                  type="date"
                  id="startdate"
                  style={{ width: "100%" }}
                  {...register("dstart")}
                />
              </div>
            </Control>
            <Control>
              <Label htmlFor="expired" style={{ marginLeft: "10px" }}>
                Discount Expired Date
              </Label>
              <div>
                <Input
                  type="date"
                  id="expired"
                  style={{ width: "100%" }}
                  {...register("dexpired")}
                />
              </div>
            </Control>
            <Control>
              <Label htmlFor="dpercent" style={{ marginLeft: "10px" }}>
                Discount Percentage
              </Label>
              <div>
                <Input
                  type="text"
                  id="dpercent"
                  style={{ width: "100%" }}
                  {...register("dpercent")}
                />
              </div>
            </Control>
            <Control>
              <Label htmlFor="limit" style={{ marginLeft: "10px" }}>
                Usage limit
              </Label>
              <div>
                <Input
                  type="text"
                  id="limit"
                  style={{ width: "100%" }}
                  {...register("dlimit")}
                />
              </div>
            </Control>
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
      </Modal.Body>
    </Modal>
  );
}

export default MyVerticallyCenteredModal;
